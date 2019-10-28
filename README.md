# Contentstack - Quality of Life Improvements
We have all been there, we need to publish some stuff en-US or something similiar. But where is it in the list of languages? scroll scroll scroll. No more! 

This script:

* Sorts them for you and does it both in the bulk publish and the single entry publish.
* Adds a button to select everything english
* Uses your screen space to provide a long list and 4 columns to choose between.

![Bask in the glory of alphabetized language list](https://github.com/mifriis/contentstack-quality-of-life-improvements/raw/master/alphabetized-language-list.PNG#1)

## How to install the script
* Install [Greasemonkey (if you use Firefox)](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey (if you use Chrome)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
* [Click here to install the script](https://github.com/mifriis/contentstack-quality-of-life-improvements/raw/master/contentstack-quality-of-life-improvements.user.js)
* The monkey should tell you the script is installed. Check monkeys running scripts list for confirmation.

## The code isn't the prettiest, can i help?
I don't program javascript full time and i did have some trouble finding identifiers (like id, name, classes etc.) so some of the code is pretty situational.

Contentstack is a singlepage app based on angular, the only way i found i could react to certain events was to wait until a certain button was there.

* If you have any suggestions on how i could improve it, please create an issue.
* If you would like to help make the improvements, feel free to do so through a pull request.
