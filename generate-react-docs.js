var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom').jsdom;
var stringify = require('json-fn').stringify;
var camelCase = require('to-case').camel;

var VUE_HTML_DOCS_PATH = './vue/';
var VUE_JADE_DOCS_PATH = './src/jade/vue/';
var REACT_HTML_OUTPUT_PATH = 'react';
var REACT_JADE_OUTPUT_PATH = './src/jade/react/';

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

function replaceVueTemplateAndScriptExamplesWithReactComponent(jade) {
    return jade.replace(/<template>((.|\n)*)<\/template>/gm, '...\nrender() {\nreturn (\n$1)\n}\n...');
}

function renameEventHeader(jade) {
    return jade.replace('h2 Events', 'h2 Event Properties');
}

function convertEventsToReactEvents(jade) {
    return renameEventHeader(jade);
    //jsdomDoc.querySelectorAll('.events-table tbody td:')
}

function renameSlotsHeader(jade) {
    return jade.replace('h2 Slots', 'h2 Slot Properties');
}

function convertSlotsToProps(jade) {
    return renameSlotsHeader(jade);
}

function convertEventPropName(vueEventPropName) {
    return camelCase('on-' + vueEventPropName.replace(/:/g, '-'));
}

function replaceEventProps(jade) {
    return jade.replace(/\@([A-Za-z0-9-]+)="(.*)"/g, function (match, p1, p2) {
        return convertEventPropName(p1) + '=' + '{' + p2 + '}';
    });
}

function convertKebabCasePropsToCamelCase(jade) {
    var componentList = getReactToVueComponentMap().map(function() { return map.react; }).join('|');
    var regex = new RegExp('<(' + componentList + ').*( ([a-z]+-[a-z]+)[ >=\/]).*\/?>', 'gm');

    return jade.replace(regex, function (match, p1, p2, p3) {
        return match.replace(p3, camelCase(p3));
    });
}

function replaceDynamicProps(jade) {
    return jade.replace(/:([A-Za-z0-9-]+)="(.*)"/g, '$1={$2}');
}

function replaceVueComponentNamesWithReactComponentNames(jade) {
    var reactToVueComponentMap = getReactToVueComponentMap();

    reactToVueComponentMap.sort(function(x, y) {
        return y.vue.split('-').length - x.vue.split('-').length;
    });

    for (var i = 0; i < reactToVueComponentMap.length; i++) {
        var vueComponentName = reactToVueComponentMap[i].vue;
        var reactComponentName = reactToVueComponentMap[i].react;

        jade = jade.replace(new RegExp(vueComponentName, 'g'), reactComponentName);
    }

    return jade;
}

function replaceVueWithReact(jade) {
    return jade.replace(/Vue/g, 'React');
}

function convertVueDocsToReactDocs(jadeFileContents) {
    var jade = jadeFileContents.contents;
    jade = replaceVueWithReact(jade);
    jade = replaceVueComponentNamesWithReactComponentNames(jade);    
    jade = replaceDynamicProps(jade);
    jade = replaceEventProps(jade);
    jade = convertKebabCasePropsToCamelCase(jade);
    jade = replaceVueTemplateAndScriptExamplesWithReactComponent(jade);
    jade = convertEventsToReactEvents(jade);
    jade = convertSlotsToProps(jade);

    return jade;
}

function getVueHtmlFiles() {    
    var files = fs.readdirSync(VUE_HTML_DOCS_PATH);

    return files.map(function (fileName) {        
        var fileContents = fs.readFileSync(VUE_HTML_DOCS_PATH + fileName, 'utf8');
        return { name: fileName, contents: fileContents };
    });
}

function getVueJadeFiles() {
    var files = fs.readdirSync(VUE_JADE_DOCS_PATH);

    return files.map(function (fileName) {        
        var fileContents = fs.readFileSync(VUE_JADE_DOCS_PATH + fileName, 'utf8');
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
    var jadeFileNamesAndContents = getVueJadeFiles();    

    for (var i = 0; i < jadeFileNamesAndContents.length; i++) {
        var jade = convertVueDocsToReactDocs(jadeFileNamesAndContents[i]);
        fs.writeFileSync(REACT_JADE_OUTPUT_PATH + '/' + jadeFileNamesAndContents[i].name, jade);
    }
};