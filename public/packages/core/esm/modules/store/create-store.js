function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-underscore-dangle */
import { extend } from '../../shared/utils';

function createStore(storeParams) {
  if (storeParams === void 0) {
    storeParams = {};
  }

  var store = {
    __store: true
  };

  var originalState = _extends({}, storeParams.state || {});

  var actions = _extends({}, storeParams.actions || {});

  var getters = _extends({}, storeParams.getters || {});

  var state = extend({}, originalState);
  var propsQueue = [];
  var gettersDependencies = {};
  var gettersCallbacks = {};
  Object.keys(getters).forEach(function (key) {
    gettersDependencies[key] = [];
    gettersCallbacks[key] = [];
  });

  var addGetterDependencies = function addGetterDependencies(key, deps) {
    if (!gettersDependencies[key]) gettersDependencies[key] = [];
    deps.forEach(function (dep) {
      if (gettersDependencies[key].indexOf(dep) < 0) {
        gettersDependencies[key].push(dep);
      }
    });
  };

  var addGetterCallback = function addGetterCallback(key, callback) {
    if (!gettersCallbacks[key]) gettersCallbacks[key] = [];
    gettersCallbacks[key].push(callback);
  };

  var runGetterCallbacks = function runGetterCallbacks(stateKey, value) {
    var keys = Object.keys(gettersDependencies).filter(function (getterKey) {
      return gettersDependencies[getterKey].indexOf(stateKey) >= 0;
    });
    keys.forEach(function (getterKey) {
      if (!gettersCallbacks[getterKey] || !gettersCallbacks[getterKey].length) return;
      gettersCallbacks[getterKey].forEach(function (callback) {
        callback(value);
      });
    });
  };

  var removeGetterCallback = function removeGetterCallback(callback) {
    Object.keys(gettersCallbacks).forEach(function (key) {
      var callbacks = gettersCallbacks[key];

      if (callbacks.indexOf(callback) >= 0) {
        callbacks.splice(callbacks.indexOf(callback), 1);
      }
    });
  }; // eslint-disable-next-line


  store.__removeCallback = function (callback) {
    removeGetterCallback(callback);
  };

  var getterValue = function getterValue(key) {
    if (key === 'constructor') return;
    propsQueue = [];
    var value = getters[key]({
      state: store.state
    });
    addGetterDependencies(key, propsQueue);

    var onUpdated = function onUpdated(callback) {
      addGetterCallback(key, callback);
    };

    var obj = {
      value: value,
      onUpdated: onUpdated
    };

    var callback = function callback(v) {
      obj.value = v;
    };

    obj.__callback = callback;
    addGetterCallback(key, callback); // eslint-disable-next-line

    return obj;
  };

  store.state = new Proxy(state, {
    set: function set(target, prop, value) {
      target[prop] = value;
      runGetterCallbacks(prop, value);
      return true;
    },
    get: function get(target, prop) {
      propsQueue.push(prop);
      return target[prop];
    }
  });
  store.getters = new Proxy(getters, {
    set: function set() {
      return false;
    },
    get: function get(target, prop) {
      if (!target[prop]) {
        return undefined;
      }

      return getterValue(prop);
    }
  });

  store.dispatch = function (actionName, data) {
    return new Promise(function (resolve, reject) {
      if (!actions[actionName]) {
        reject();
        throw new Error("Framework7: Store action \"" + actionName + "\" is not found");
      }

      var result = actions[actionName]({
        state: store.state,
        dispatch: store.dispatch
      }, data);
      resolve(result);
    });
  };

  return store;
}

export default createStore;