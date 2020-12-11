"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ssrWindow = require("ssr-window");

var _dom = _interopRequireDefault(require("../../shared/dom7"));

var _utils = require("../../shared/utils");

var _getDevice = require("../../shared/get-device");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Statusbar = {
  hide: function hide() {
    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();

    if (device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  },
  show: function show() {
    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();

    if (device.cordova && window.StatusBar) {
      window.StatusBar.show();
    }
  },
  onClick: function onClick() {
    var app = this;
    var pageContent;

    if ((0, _dom.default)('.popup.modal-in').length > 0) {
      // Check for opened popup
      pageContent = (0, _dom.default)('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ((0, _dom.default)('.panel.panel-in').length > 0) {
      // Check for opened panel
      pageContent = (0, _dom.default)('.panel.panel-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ((0, _dom.default)('.views > .view.tab-active').length > 0) {
      // View in tab bar app layout
      pageContent = (0, _dom.default)('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ((0, _dom.default)('.views').length > 0) {
      pageContent = (0, _dom.default)('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else {
      pageContent = app.$el.children('.view').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    }

    if (pageContent && pageContent.length > 0) {
      // Check for tab
      if (pageContent.hasClass('tab')) {
        pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
      }

      if (pageContent.length > 0) pageContent.scrollTop(0, 300);
    }
  },
  setTextColor: function setTextColor(color) {
    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();

    if (device.cordova && window.StatusBar) {
      if (color === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  },
  setBackgroundColor: function setBackgroundColor(color) {
    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();

    if (device.cordova && window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(color);
    }
  },
  isVisible: function isVisible() {
    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();

    if (device.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }

    return false;
  },
  overlaysWebView: function overlaysWebView(overlays) {
    if (overlays === void 0) {
      overlays = true;
    }

    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();

    if (device.cordova && window.StatusBar) {
      window.StatusBar.overlaysWebView(overlays);
    }
  },
  init: function init() {
    var app = this;
    var window = (0, _ssrWindow.getWindow)();
    var device = (0, _getDevice.getDevice)();
    var params = app.params.statusbar;
    if (!params.enabled) return;

    if (device.cordova && window.StatusBar) {
      if (params.scrollTopOnClick) {
        (0, _dom.default)(window).on('statusTap', Statusbar.onClick.bind(app));
      }

      if (device.ios) {
        if (params.iosOverlaysWebView) {
          window.StatusBar.overlaysWebView(true);
        } else {
          window.StatusBar.overlaysWebView(false);
        }

        if (params.iosTextColor === 'white') {
          window.StatusBar.styleLightContent();
        } else {
          window.StatusBar.styleDefault();
        }
      }

      if (device.android) {
        if (params.androidOverlaysWebView) {
          window.StatusBar.overlaysWebView(true);
        } else {
          window.StatusBar.overlaysWebView(false);
        }

        if (params.androidTextColor === 'white') {
          window.StatusBar.styleLightContent();
        } else {
          window.StatusBar.styleDefault();
        }
      }
    }

    if (params.iosBackgroundColor && device.ios) {
      Statusbar.setBackgroundColor(params.iosBackgroundColor);
    }

    if (params.androidBackgroundColor && device.android) {
      Statusbar.setBackgroundColor(params.androidBackgroundColor);
    }
  }
};
var _default = {
  name: 'statusbar',
  params: {
    statusbar: {
      enabled: true,
      scrollTopOnClick: true,
      iosOverlaysWebView: true,
      iosTextColor: 'black',
      iosBackgroundColor: null,
      androidOverlaysWebView: false,
      androidTextColor: 'black',
      androidBackgroundColor: null
    }
  },
  create: function create() {
    var app = this;
    (0, _utils.bindMethods)(app, {
      statusbar: Statusbar
    });
  },
  on: {
    init: function init() {
      var app = this;
      Statusbar.init.call(app);
    }
  }
};
exports.default = _default;