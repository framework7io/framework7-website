const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');
const sveltePrism = require('./svelte-prism');

loadLanguages(['jsx', 'bash', 'css', 'less']);

function extendLanguage(lang) {
  Prism.languages[lang].function = /[a-z0-9_$]+(?=\()/i;
  Prism.languages[
    lang
  ].keyword = /\b(?:as|class|const|debugger|delete|enum|extends|finally|function|get|implements|in|instanceof|interface|let|new|of|package|private|protected|public|set|static|typeof|var|void|yield)\b/;
  Prism.languages[lang][
    'keyword-block'
  ] = /\b(?:export|default|for|if|while|do|return|import|from|await|async|switch|case|break|continue|else|try|catch|with|throw)\b/;
  Prism.languages[lang].context = /\b(?:this|self|super)\b/;
  Prism.languages[lang].literal = /\b(?:undefined|null)\b/;
  Prism.languages[lang][
    'built-in'
  ] = /\b(?:Number|String|Function|Boolean|Array|Symbol|Math|Date|RegExp|Map|Set|WeakMap|WeakSet|Object|JSON|Promise|Generator|Window|console|window|FormData)\b/;
  if (Prism.languages[lang]['template-string']) {
    Prism.languages[lang]['template-string'].inside.interpolation.inside.context =
      Prism.languages[lang].context;
  }
  if (Prism.languages[lang].script) {
    Prism.languages[lang].script.inside.context = Prism.languages[lang].context;
    Prism.languages[lang].script.inside['keyword-block'] = Prism.languages[lang]['keyword-block'];
  }
}
extendLanguage('javascript');
sveltePrism(Prism);
extendLanguage('jsx');
extendLanguage('svelte');

function highlight(code, lang) {
  if (lang === 'js') lang = 'javascript';
  if (!lang) lang = 'html';
  if (!Prism.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch (e) {
      // No lang
    }
  }
  let highlighted = Prism.highlight(code, Prism.languages[lang], lang);
  if (lang === 'css' || lang === 'less') {
    highlighted = highlighted
      .replace(/#[a-fA-F0-9]{3,6}/g, (color) => {
        return `<span style="background-color: ${color}" class="code-color"></span>${color}`;
      })
      .replace(
        /(<span class="token function">rgba<\/span><span class="token punctuation">\(<\/span>)([0-9]{1,3}[ ]{0,},[ ]{0,}[0-9]{1,3}[ ]{0,},[ ]{0,}[0-9]{1,3}[ ]{0,},[ ]{0,}[0-9.]*)(<span class="token punctuation">\)<\/span>)/g,
        (text, pre, color, post) => {
          return `<span style="background-color: rgba(${color})" class="code-color"></span>${pre}${color}${post}`;
        },
      );
  }
  return highlighted;
}

module.exports = highlight;
