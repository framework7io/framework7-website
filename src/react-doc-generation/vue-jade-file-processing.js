const fs = require('fs');
const path = require('path');
const stringify = require('json-fn').stringify;
const camelCase = require('to-case').camel;

const VUE_JADE_DOCS_PATH = './src/jade/vue/';
const REACT_JADE_OUTPUT_PATH = './react-jade-temp';

const ensureDirectoryExistence = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);    
    }
}

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
}

//function replaceVueTemplateAndScriptExamplesWithReactComponent(jade) {
//    return jade.replace(/<template>((.|\n)*)<\/template>/gm, '...\nrender() {\nreturn (\n$1)\n}\n...');
//}

const renameEventHeader = (jade) => {
    return jade.replace('h2 Events', 'h2 Event Properties');
}

const convertEventsToReactEvents = (jade) => {
    return renameEventHeader(jade);    
}

const renameSlotsHeader = (jade) => {
    return jade.replace('h2 Slots', 'h2 Slot Properties');
}

const convertSlotsToProps = (jade) => {
    return renameSlotsHeader(jade);
}

const convertEventPropName = (vueEventPropName) => {
    return camelCase('on-' + vueEventPropName.replace(/:/g, '-'));
}

const replaceEventProps = (jade) => {
    return jade.replace(/\@([A-Za-z0-9-:]+)=["{](.*)["}]/g, (match, p1, p2) => {
        return convertEventPropName(p1) + '=' + '{' + p2 + '}';
    });
}

const convertKebabCasePropsToCamelCase = (jade) => {
    const componentList = getReactToVueComponentMap().map(map => map.react).join('|');
    const regex = new RegExp('<(' + componentList + ').*( ([a-z]+-[a-z]+(-[a-z]+)?(-[a-z]+)?)[ =\/]?).*\/?>', 'gm');

    return jade.replace(regex, function (match) {
        return match.replace(/([a-z]+-[a-z]+(-[a-z]+)?(-[a-z]+)?(-[a-z]+)?(-[a-z]+)?(-[a-z]+)?)/gm, function (match) {
            return camelCase(match);
        });        
    });
}

const replaceDynamicProps = (jade) => {
    return jade.replace(/\s:([A-Za-z0-9-]+)="([^"]+)"/g, ' $1={$2}');
}

const replaceVueComponentNamesWithReactComponentNames = (jade) => {
    let reactToVueComponentMap = getReactToVueComponentMap();

    reactToVueComponentMap.sort((x, y) => {
        return y.vue.split('-').length - x.vue.split('-').length;
    });

    for (var i = 0; i < reactToVueComponentMap.length; i++) {
        const vueComponentName = reactToVueComponentMap[i].vue;
        const reactComponentName = reactToVueComponentMap[i].react;

        jade = jade.replace(new RegExp(vueComponentName, 'g'), reactComponentName);
    }

    return jade;
}

const replaceVueWithReact = (jade) => {
    return jade.replace(/Vue/g, 'React');
}

const replaceImportPaths = (jade) => {
    jade = jade.replace('extends ../_internal-template', 'extends ../src/jade/_internal-template');
    jade = jade.replace('include ../_docs-vue-menu', 'include ./_docs-react-menu');

    return jade;
}

const replaceActiveLink = (jade) => {
    return jade.replace('var activeLink = \'vue\'', 'var activeLink = \'react\'');
}

const convertVueDocsToReactDocs = (jadeFileContents) => {
    let jade = jadeFileContents.contents;

    jade = replaceImportPaths(jade);
    jade = replaceActiveLink(jade);
    jade = replaceVueWithReact(jade);
    jade = replaceVueComponentNamesWithReactComponentNames(jade);    
    jade = replaceDynamicProps(jade);
    jade = replaceEventProps(jade);
    jade = convertKebabCasePropsToCamelCase(jade);
    jade = convertEventsToReactEvents(jade);
    jade = convertSlotsToProps(jade);

    return jade;
}

const getVueJadeFiles = () => {
    const files = fs.readdirSync(VUE_JADE_DOCS_PATH);
    
    return files.map(function (fileName) {
        const fileContents = fs.readFileSync(VUE_JADE_DOCS_PATH + fileName, 'utf8');
     
        return { name: fileName, contents: fileContents };
    });

}

const processMenuJadeFile = () => {
    let menuJadeFile = fs.readFileSync('./src/jade/_docs-vue-menu.jade', 'utf8');
    menuJadeFile = replaceVueWithReact(menuJadeFile);
    fs.writeFileSync(REACT_JADE_OUTPUT_PATH + '/' + '_docs-react-menu.jade', menuJadeFile);
};

const copyIntroductoryFiles = () => {
    fs.readdirSync('./src/jade/react/').forEach(jadeFile => {
        const jadeFileContents = fs.readFileSync('./src/jade/react/' + jadeFile, 'utf8');
        fs.writeFileSync(REACT_JADE_OUTPUT_PATH + '/' + jadeFile, jadeFileContents);
    });
};

const cleanJadeFiles = () => {
    const files = fs.readdirSync(REACT_JADE_OUTPUT_PATH);

    files.forEach(file => {
        fs.unlinkSync(REACT_JADE_OUTPUT_PATH + '/' + file);
    });
}

module.exports.processVueJadeFiles = () => {
    ensureDirectoryExistence(REACT_JADE_OUTPUT_PATH);
    cleanJadeFiles();
    processMenuJadeFile();
    copyIntroductoryFiles();

    getVueJadeFiles().forEach(jadeFileInfo => {
        const destinationFileName = REACT_JADE_OUTPUT_PATH + '/' + jadeFileInfo.name;

        if (!fs.existsSync(destinationFileName)) {
            const jade = convertVueDocsToReactDocs(jadeFileInfo);
            fs.writeFileSync(destinationFileName, jade);
        }
    });
};