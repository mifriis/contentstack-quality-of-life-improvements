// ==UserScript==
// @name        Contentstack - Quality of Life Improvements
// @description Different features to make life in contentstack slightly less frustrating.
// @author      Michael Friis
// @match        https://app.contentstack.com/
// @version      0.6
// @grant GM_addStyle
// ==/UserScript==

//Contentstack is a singlepage app. We need to listen to changes to page history, as well as run it on domloaded
var observer; //Global to ensure we can top any observer on page change
sortLanguages();
window.onpopstate = function(event) {
    clearTimeout(observer); //Get rid of any left over observers from the last page change.
    sortLanguages();
};

function sortLanguages() {
    function matchesSingleEntry(url) {
        var pageExpression = new RegExp("app.contentstack.com\/#!\/stack\/[^/]+\/content-type\/[^/]+\/[^/]+\/entry\/\.*");
        if (url.match(pageExpression)) {
            return true;
        }
        return false;
    }

    function matchesEntryList(url) {
        var pageExpression = new RegExp("app.contentstack.com\/#!\/stack\/[^/]+\/content-type\/[^/]+\/[^/]+\/entries\.*");
        if (url.match(pageExpression)) {
            return true;
        }
        return false;
    }

    if(matchesSingleEntry(location.href)) {
       findReleaseButtonOnEntry();
    }
    else if(matchesEntryList(location.href)) {
        findReleaseButtonOnEntries();
    }

    function waitForLoad(functionToExecute) {
        observer = setTimeout(functionToExecute, 100);
    }
    function findReleaseButtonOnEntry() {
        var releaseButton = document.querySelectorAll(".rel-pub-btn");
        if(releaseButton.length == 0) {
            waitForLoad(findReleaseButtonOnEntry)
        }
        if(releaseButton.length == 1) {
            releaseButton[0].addEventListener("click", findLanguageList);
        }
    }

    function findReleaseButtonOnEntries() {
        var bulkActions = document.querySelector("input[id=ent-head-check]");

        if(!bulkActions) {
            waitForLoad(findReleaseButtonOnEntries)
        }
        if(bulkActions) {
            bulkActions.addEventListener("change", function() {
                if(this.checked) {
                    var publishButton = document.querySelectorAll('.bulk-actions')[0];
                    publishButton = publishButton.children[1].children[0].children[0];
                    publishButton.addEventListener("click", findLanguageList);
                 }
            });
        }
    }

    function findLanguageList() {
        function addSelectEnglishButton() {
            var selectAllButton = document.querySelectorAll('.selectall')[0];
            var selectAllEnglishButton = document.createElement('a');
            selectAllEnglishButton.innerHTML = "Select all english";
            selectAllEnglishButton.className += " selectall";
            selectAllButton.parentNode.insertBefore(selectAllEnglishButton, selectAllButton.nextSibling)

            selectAllEnglishButton.addEventListener("click", function(){
                var i;
                for(i = 0; i < orderedLanguageList.length; i++) {

                    var languageElement = orderedLanguageList[i];
                    if(languageElement.element.outerText.includes("English")) {
                       var checkbox = languageElement.element.querySelector('input');
                        checkbox.checked = true;
                       console.log(checkbox,"");
                    }
                }

            });
        }

        function replaceLanguageList(orderedLanguageList) {
            var languageList = document.querySelectorAll('.language-border')[0];
            var languageListModal = document.querySelectorAll('.ngdialog-content')[0];
            languageList.style.maxHeight = "none";
            languageListModal.setAttribute( 'style', 'width:1050px!important' );
            addSelectEnglishButton();
            while (languageList.firstChild) {
                languageList.removeChild(languageList.firstChild);
            }

            var i;
            for (i = 0; i < orderedLanguageList.length; i++) {
                languageList.appendChild(orderedLanguageList[i].element);
            }

        }

        function sortLanguageList(languageList) {
         function compare( a, b ) {
             if ( a.name < b.name ){
                 return -1;
             }
             if ( a.name > b.name ){
                 return 1;
             }
             return 0;
         }

            return languageList.sort( compare );
        }
        var languageList = document.querySelectorAll('.language-border');
        if(languageList.length === 0) {
            waitForLoad(findLanguageList)
        }

        var orderedLanguageList = [];
        if(languageList.length == 1) {
            var languages = [].slice.call(languageList[0].children);
            languages.map(x => {
                var inputField = x.firstElementChild.firstElementChild.firstElementChild;
                var language = {
                    element: x,
                    name: inputField.name
                }
                orderedLanguageList.push(language);
            });
            orderedLanguageList = sortLanguageList(orderedLanguageList);
            replaceLanguageList(orderedLanguageList);
        }
    }
}

GM_addStyle(`
    .language-border li:nth-child(3n+3) {
        margin: 0 11px 11px 0;
    }

    .language-border li:nth-child(4n+4) {
        margin: 0 0 11px;
    }

    .entry-create .column-hidden .overflow-for-column .cs-table-body .table-cell-column,
    .entry-list .column-hidden .overflow-for-column .cs-table-body .table-cell-column {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .cs-table .cs-table-top-header {
        padding-top: 3px;
        padding-bottom: 3px;
        height: 39px;
    }

    .entry-create .column-hidden .overflow-for-column .dummyhead,
    .entry-list .column-hidden .overflow-for-column .dummyhead {
        height: 37px;
    }

    .entry-create .column-hidden .overflow-for-column .table-cell-column,
    .entry-list .column-hidden .overflow-for-column .table-cell-column {
        padding: 6px 10px 8px 15px;
    }

    #main-container > div > div.page-content.page-content-large.ng-scope > div > div > div > div.entry-list > div > div.overflow-for-column-hidden > div > div.dummyhead > div.cs-checkbox.ng-scope > label > span.lbl {
        top: 11px!important;
    }

    .entries .efw {
        margin-bottom: 0;
        padding-top: 0;
    }

    .entries .cs-form-group .entry-group-fields .group-fields .panel-group .panel-default .panel-body .cs-form-group {
        margin-bottom: 0;
    }

    .entries .cs-form-group .entry-group-fields .single-group>div {
        padding: 0px 6px;
    }

    /* Balloon popup */ 

    .ui-pnotify {
        width: initial!important;
    }

    .ui-pnotify-container {
        padding: 12px 36px 12px 12px;
        background-color: #444;
        border-color: #444;
    }
    
    /* intercom garbage */

    #intercom-css-container, #intercom-container { display: none; }
    
`);