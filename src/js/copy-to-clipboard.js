const Clipboard = {
  el: undefined,
  createEl() {
    const el = document.createElement('div');
    el.style.display = 'none';
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.right = '100%';
    el.style.bottom = '100%';
    el.style.userSelect = 'text';
    el.style.webkitUserSelect = 'text';
    el.style['-webkit-user-select'] = 'text';
    document.body.appendChild(el);
    Clipboard.el = el;
  },
  showEl() {
    Clipboard.el.style.display = 'block';
    Clipboard.el.style.visibility = 'visible';
  },
  hideEl() {
    Clipboard.el.style.display = 'none';
    Clipboard.el.style.visibility = 'hidden';
  },
  copy(text) {
    if (!Clipboard.el) {
      Clipboard.createEl();
    }
    Clipboard.el.innerHTML = text;

    try {
      window.getSelection().removeAllRanges();
    } catch (err) {
      // no support
    }

    Clipboard.showEl();

    const range = document.createRange();
    range.selectNode(Clipboard.el);

    let success;
    try {
      window.getSelection().addRange(range);
      // Now that we've selected the anchor text, execute the copy command
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }

    try {
      window.getSelection().removeAllRanges();
    } catch (err) {
      // no support
    }

    Clipboard.hideEl();

    return success;
  },
};

export default function (text, callback) {
  const result = Clipboard.copy(text);
  if (result && callback) callback();
};
