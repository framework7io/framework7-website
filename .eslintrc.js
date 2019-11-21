module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": "off",
    "prefer-destructuring": "off",
    "arrow-body-style": "off",
    "no-console": "off",
    "global-require": "off",
    "no-useless-escape": "off",
    "no-continue": "off",
    "no-underscore-dangle": "off",
  },
  'globals': {
    "localStorage": true,
    "window": true,
    "document": true,
    "XMLHttpRequest": true,
    "Blob": true,
    "Document": true,
    "FormData": true,
  },
};