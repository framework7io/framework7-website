const fs = require('fs');
const path = require('path');
const stringify = require('json-fn').stringify;
const camelCase = require('to-case').camel;

const VUE_PUG_DOCS_PATH = './src/pug/vue/';
const REACT_PUG_OUTPUT_PATH = './react-pug-temp';

const ensureDirectoryExistence = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
};

const getReactToVueComponentMap = () => {
    const framework7Vue = fs.readFileSync('./node_modules/framework7-vue/src/framework7-vue.js', 'utf8');
    const framework7VueString = stringify(framework7Vue);
    const regex = new RegExp(/["'](f7-[A-Za-z0-9-]+)["']\s*\:\s*([A-Za-z0-9]+),/, 'g');
    let match;
    const reactToVueComponentMap = [];

    while (match = regex.exec(framework7VueString)) {
        const tagName = match[1];
        const componentName = match[2];

        reactToVueComponentMap.push({
            react: componentName,
            vue: tagName
        });
    }

    return reactToVueComponentMap;
};

const renameEventHeader = (pug) => {
    return pug.replace('h2 Events', 'h2 Event Properties');
};

const convertEventsToReactEvents = (pug) => {
    return renameEventHeader(pug);
};

const renameSlotsHeader = (pug) => {
    return pug.replace('h2 Slots', 'h2 Slot Properties');
};

const convertSlotsToProps = (pug) => {
    return renameSlotsHeader(pug);
};

const convertEventPropName = (vueEventPropName) => {
    return camelCase('on-' + vueEventPropName.replace(/:/g, '-'));
};

const replaceEventProps = (pug) => {
    return pug.replace(/\@([A-Za-z0-9-:]+)=["{](.*)["}]/g, (match, p1, p2) => {
        return convertEventPropName(p1) + '=' + '{' + p2 + '}';
    });
};

const convertKebabCasePropsToCamelCase = (pug) => {
    const componentList = getReactToVueComponentMap().map(map => map.react).join('|');
    const regex = new RegExp('<(' + componentList + ').*( ([a-z]+-[a-z]+(-[a-z]+)?(-[a-z]+)?)[ =\/]?).*\/?>', 'gm');

    return pug.replace(regex, function (match) {
        return match.replace(/([a-z]+-[a-z]+(-[a-z]+)?(-[a-z]+)?(-[a-z]+)?(-[a-z]+)?(-[a-z]+)?)/gm, function (match) {
            return camelCase(match);
        });
    });
};

const replaceDynamicProps = (pug) => {
    return pug.replace(/\s:([A-Za-z0-9-]+)="([^"]+)"/g, ' $1={$2}');
};

const convertCodeBlockPropsToCamelCase = (pug) => {
    return pug.replace(/<code>(&lt;[A-Z][[a-z]+)?([a-z- ]+)(&gt;)?<\/code>/g, (match, g1, g2) => {
        g2.split(' ').forEach((prop) => {
            const trimmedProp = prop.trim();
            const camelCaseProp = camelCase(trimmedProp);
            match = match.replace(trimmedProp, camelCaseProp);
        });

        return match;
    });
};

const replaceVueComponentNamesWithReactComponentNames = (pug) => {
    let reactToVueComponentMap = getReactToVueComponentMap();

    reactToVueComponentMap.sort((x, y) => {
        return y.vue.split('-').length - x.vue.split('-').length;
    });

    for (var i = 0; i < reactToVueComponentMap.length; i++) {
        const vueComponentName = reactToVueComponentMap[i].vue;
        const reactComponentName = reactToVueComponentMap[i].react;

        pug = pug.replace(new RegExp(vueComponentName, 'g'), reactComponentName);
    }

    return pug;
};

const replaceVueWithReact = (pug) => {
    return pug.replace(/Vue/g, 'React');
};

const replaceImportPaths = (pug) => {
    pug = pug.replace('extends ../_docs-template', 'extends ../src/pug/_docs-template');
    pug = pug.replace('include ../_docs-vue-menu', 'include ./_docs-react-menu');

    return pug;
};

const replaceActiveLink = (pug) => {
    return pug.replace('var activeLink = \'vue\'', 'var activeLink = \'react\'');
};

const convertVueDocsToReactDocs = (pugFileContents) => {
    let pug = pugFileContents.contents;

    pug = replaceImportPaths(pug);
    pug = replaceActiveLink(pug);
    pug = replaceVueWithReact(pug);
    pug = replaceVueComponentNamesWithReactComponentNames(pug);
    pug = replaceDynamicProps(pug);
    pug = replaceEventProps(pug);
    pug = convertKebabCasePropsToCamelCase(pug);
    pug = convertCodeBlockPropsToCamelCase(pug);
    pug = convertEventsToReactEvents(pug);
    pug = convertSlotsToProps(pug);

    return pug;
};

const getVuePugFiles = () => {
    const files = fs.readdirSync(VUE_PUG_DOCS_PATH);

    return files.map(function (fileName) {
        const fileContents = fs.readFileSync(VUE_PUG_DOCS_PATH + fileName, 'utf8');

        return { name: fileName, contents: fileContents };
    });

};

const processMenuPugFile = () => {
    let menuPugFile = fs.readFileSync('./src/pug/_docs-vue-menu.pug', 'utf8');
    menuPugFile = replaceVueWithReact(menuPugFile);
    fs.writeFileSync(REACT_PUG_OUTPUT_PATH + '/' + '_docs-react-menu.pug', menuPugFile);
};

const copyIntroductoryFiles = () => {
    fs.readdirSync('./src/pug/react/').forEach(pugFile => {
        const pugFileContents = fs.readFileSync('./src/pug/react/' + pugFile, 'utf8');
        fs.writeFileSync(REACT_PUG_OUTPUT_PATH + '/' + pugFile, pugFileContents);
    });
};

const cleanPugFiles = () => {
    const files = fs.readdirSync(REACT_PUG_OUTPUT_PATH);

    files.forEach(file => {
        fs.unlinkSync(REACT_PUG_OUTPUT_PATH + '/' + file);
    });
};

module.exports.processVuePugFiles = () => {
    ensureDirectoryExistence(REACT_PUG_OUTPUT_PATH);
    cleanPugFiles();
    processMenuPugFile();
    copyIntroductoryFiles();

    getVuePugFiles().forEach(pugFileInfo => {
        const destinationFileName = REACT_PUG_OUTPUT_PATH + '/' + pugFileInfo.name;

        if (!fs.existsSync(destinationFileName)) {
            const pug = convertVueDocsToReactDocs(pugFileInfo);
            fs.writeFileSync(destinationFileName, pug);
        }
    });
};
