const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');

loadLanguages(['jsx', 'bash']);

function extendLanguage(lang) {
  Prism.languages[lang].function = /[a-z0-9_$]+(?=\()/i;
  Prism.languages[lang].keyword = /\b(?:as|class|const|debugger|delete|enum|extends|finally|function|get|implements|in|instanceof|interface|let|new|of|package|private|protected|public|set|static|typeof|var|void|yield)\b/;
  Prism.languages[lang]['keyword-block'] = /\b(?:export|default|for|if|while|do|return|import|from|await|async|switch|case|break|continue|else|try|catch|with|throw)\b/;
  Prism.languages[lang].context = /\b(?:this|self|super)\b/;
  Prism.languages[lang].literal = /\b(?:undefined|null)\b/;
  Prism.languages[lang]['built-in'] = /\b(?:Number|String|Function|Boolean|Array|Symbol|Math|Date|RegExp|Map|Set|WeakMap|WeakSet|Object|JSON|Promise|Generator|Window|console|window|FormData)\b/;
  Prism.languages[lang]['template-string'].inside.interpolation.inside.context = Prism.languages[lang].context;
  if (Prism.languages[lang].script) {
    Prism.languages[lang].script.inside.context = Prism.languages[lang].context;
    Prism.languages[lang].script.inside['keyword-block'] = Prism.languages[lang]['keyword-block']
  }
}
extendLanguage('javascript');
extendLanguage('jsx');

function highlight(code, lang) {
  if (lang === 'js') lang = 'javascript';
  if (!lang) lang = 'html';
  if (!lang) return code;
  if (!Prism.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch (e) {
      // No lang
    }
  }
  return Prism.highlight(code, Prism.languages[lang], lang)
}

module.exports = highlight;