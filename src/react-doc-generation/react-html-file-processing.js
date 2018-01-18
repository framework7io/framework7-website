const fs = require('fs');
const jsdom = require('jsdom');
const camelCase = require('to-case').camel;

const REACT_HTML_PATH = './react';

const replacePropsTable = (jsDomDoc) => {
    const nodes = jsDomDoc.querySelectorAll('.params-table tbody td:first-child');

    nodes.forEach(node => {
        node.innerHTML = camelCase(node.innerHTML);
    });
};

const replaceEventsTable = (jsDomDoc) => {
    const nodes = jsDomDoc.querySelectorAll('.events-table tbody td:first-child');

    nodes.forEach(node => {
        node.innerHTML = camelCase(('on-' + node.innerHTML).replace(/:/g, '-'));
    });
}

const removeMethodsTable = (jsDomDoc) => {
    jsDomDoc.querySelectorAll('.methods-table').forEach(node => {
        node.parentNode.removeChild(node);
    });

    jsDomDoc.querySelectorAll('h2').forEach(node => {
        if (node.innerHTML === 'Methods') {
            node.parentNode.removeChild(node);
        }
    });
}

const processReactHtmlFile = (htmlFileInfo) => {
    const jsDomDoc = htmlFileInfo.jsDomDocument;

    replaceEventsTable(jsDomDoc);
    replacePropsTable(jsDomDoc);
    removeMethodsTable(jsDomDoc);
};

const getReactHtmlFiles = (callback) => {
    const files = fs.readdirSync(REACT_HTML_PATH).filter(function (fileName) {
        return fileName.indexOf('.') !== 0;
    });
    const htmlFileInfoArray = [];

    return files.map(function (fileName) {
        const fileContents = fs.readFileSync(REACT_HTML_PATH + '/' + fileName, 'utf8');
        const htmlFileInfo = { name: fileName, contents: fileContents, jsDomDocument: null };

        jsdom.env(fileContents, (err, window) => {
            if (err) {
                console.error(err);
            }

            htmlFileInfo.jsDomDocument = window.document;
            htmlFileInfoArray.push(htmlFileInfo);

            if (htmlFileInfoArray.length === files.length) {
                callback(htmlFileInfoArray);
            }
        });
    });
}

module.exports.processReactHtmlFiles = (callback) => {
    const reactHtmlFiles = getReactHtmlFiles(reactHtmlFiles => {
        reactHtmlFiles.forEach(reactHtmlFileInfo => {
            processReactHtmlFile(reactHtmlFileInfo);
            const outputHtml = jsdom.serializeDocument(reactHtmlFileInfo.jsDomDocument);
            fs.writeFileSync(REACT_HTML_PATH + '/' + reactHtmlFileInfo.name, outputHtml);
        });

        if (callback) callback();
    });
};
