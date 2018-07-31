const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');

loadLanguages(['jsx', 'bash']);

function extendLanguage(lang) {
  Prism.languages[lang].keyword = /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|typeof|var|void|while|with|yield)\b/;
  Prism.languages[lang].context = /\b(?:this|self|super)\b/;
  Prism.languages[lang].literal = /\b(?:undefined|null)\b/;
  Prism.languages[lang]['built-in'] = /\b(?:Number|String|Function|Boolean|Array|Symbol|Math|Date|RegExp|Map|Set|WeakMap|WeakSet|Object|JSON|Promise|Generator|Window|console|window|FormData)\b/;
  Prism.languages[lang]['template-string'].inside.interpolation.inside.context = /\b(?:this|self|super)\b/;
  if (Prism.languages[lang].script) {
    Prism.languages[lang].script.inside.context = /\b(?:this|self|super)\b/;
  }
}
extendLanguage('javascript');
extendLanguage('jsx');

function highlight(code, lang) {
  if (lang === 'js') lang = 'javascript';
  if (!lang) return code;
  return Prism.highlight(code, Prism.languages[lang], lang)
}

module.exports = highlight;