'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_EXTENSIONS = ['.yml', '.yaml'];

let oldHandlers = {};

const restore = () => {
  Object.keys(oldHandlers).forEach(ext => {
    if (oldHandlers[ext] === undefined) delete oldHandlers[ext];else require.extensions[ext] = oldHandlers[ext];
  });

  oldHandlers = {};
};

// https://github.com/okonet/yaml-loader/blob/master/index.js
// https://github.com/bkonkle/ignore-styles/blob/master/ignore-styles.js
// http://stackoverflow.com/questions/13752272/simple-require-extensions-example-not-working
const yamlLoader = (module, filename) => {
  console.log('filename', filename); // eslint-disable-line no-console
  const res = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(filename));
  console.log('res', res); // eslint-disable-line no-console
  module.exports = JSON.stringify(res, undefined, '\t'); // eslint-disable-line no-param-reassign
};

const register = (extensions = DEFAULT_EXTENSIONS, handler = yamlLoader) => {
  restore();

  extensions.forEach(ext => {
    oldHandlers[ext] = require.extensions[ext];
    require.extensions[ext] = handler;
  });
};

register();

exports.default = register;