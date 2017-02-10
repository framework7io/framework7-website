var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom').jsdom;
var stringify = require('json-fn').stringify;

var VUE_DOCS_PATH = './vue/';
var REACT_DOCS_OUTPUT_PATH = 'react';

function ensureDirectoryExistence(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);    
    }
}

function getReactToVueComponentMap() {
    var framework7Vue = fs.readFileSync('./node_modules/framework7-vue/src/framework7-vue.js', 'utf8');
    var framework7VueString = stringify(framework7Vue);
    var regex = new RegExp(/["'](f7-[A-Za-z0-9-]+)["']\s*\:\s*([A-Za-z0-9]+),/, 'g');
    var match;
    var reactToVueComponentMap = [];    
    
    while (match = regex.exec(framework7VueString)) {
        var tagName = match[1];
        var componentName = match[2];

        reactToVueComponentMap.push({
            react: componentName,
            vue: tagName
        });        
    }

    return reactToVueComponentMap;
}

function renameEventHeader(jsdomDoc) {
    jsdomDoc.documentElement.querySelectorAll('.events-table').forEach(function (element) {
        console.log(element.parentNode.outerHTML);
        if (element.previousSibling.tagName.toLowerCase() === 'h2') {
            let eventHeader = element.previousSibling;
            eventHeader.innerHTML = eventHeader.innerHTML.replace('Event', 'Event Props');
        }
    });
}

function convertEventsToReactEvents(jsdomDoc) {
    //renameEventHeader(jsdomDoc);
    //jsdomDoc.querySelectorAll('.events-table tbody td:')
}

function replaceEventProps(html) {

}

function replaceDynamicProps(html) {
    return html.replace(/:([A-Za-z0-9-]+)=(")(.*)(")/g, '$1={$2}');
}

function replaceVueCommentsWithJsxComments(html) {
     return html.replace(new RegExp('<!--', 'g'), '{/*')
        .replace(new RegExp('-->', 'g'), '*/}');
}

function replaceVueComponentNamesWithReactComponentNames(html) {
    var reactToVueComponentMap = getReactToVueComponentMap();

    reactToVueComponentMap.sort(function(x, y) {
        return y.vue.split('-').length - x.vue.split('-').length;
    });

    for (var i = 0; i < reactToVueComponentMap.length; i++) {
        var vueComponentName = reactToVueComponentMap[i].vue;
        var reactComponentName = reactToVueComponentMap[i].react;

        html = html.replace(new RegExp(vueComponentName, 'g'), reactComponentName);
    }

    return html;
}

function replaceVueWithReact(html) {
    return html.replace(/Vue/g, 'React');
}

function convertVueDocsToReactDocs(htmlFileContents, jsdomDoc) {
    convertEventsToReactEvents(jsdomDoc);

    var html = jsdomDoc.documentElement.outerHTML;
    html = replaceVueWithReact(html);
    html = replaceVueComponentNamesWithReactComponentNames(html);
    html = replaceVueCommentsWithJsxComments(html);
    html = replaceDynamicProps(html);

    return html;
}

function getVueHtmlFiles() {    
    var files = fs.readdirSync(VUE_DOCS_PATH);

    return files.map(function (fileName) {        
        var fileContents = fs.readFileSync(VUE_DOCS_PATH + fileName, 'utf8');
        return { name: fileName, contents: fileContents };
    });
}

function getJsDomDocuments(htmlFileNamesAndContents) {
    return htmlFileNamesAndContents.map(function (htmlFileNamesAndContents) {
        var document = jsdom(htmlFileNamesAndContents.contents, {
            features: {
                FetchExternalResources: false
            }
        });

        return { name: htmlFileNamesAndContents.name, document: document };
    });
}

module.exports = function () {
    var htmlFileNamesAndContents = getVueHtmlFiles();
    var jsdomDocs = getJsDomDocuments(htmlFileNamesAndContents);

    ensureDirectoryExistence(REACT_DOCS_OUTPUT_PATH);

    for (var i = 0; i < htmlFileNamesAndContents.length; i++) {        
        var convertedContent = convertVueDocsToReactDocs(htmlFileNamesAndContents[i].contents, jsdomDocs[i].document);
        fs.writeFileSync(REACT_DOCS_OUTPUT_PATH + '/' + htmlFileNamesAndContents[i].name, convertedContent);
    }
};