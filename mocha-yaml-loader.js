import fs from 'fs';
import yaml from 'js-yaml';

const DEFAULT_EXTENSIONS = [
  '.yml',
  '.yaml',
];

let oldHandlers = {};

const restore = () => {
  Object.keys(oldHandlers).forEach((ext) => {
    if (oldHandlers[ext] === undefined) delete oldHandlers[ext];
    else require.extensions[ext] = oldHandlers[ext];
  });

  oldHandlers = {};
};

// https://github.com/okonet/yaml-loader/blob/master/index.js
// https://github.com/bkonkle/ignore-styles/blob/master/ignore-styles.js
// http://stackoverflow.com/questions/13752272/simple-require-extensions-example-not-working
const yamlLoader = (module, filename) => {
  // eslint-disable-next-line no-param-reassign
  module.exports = yaml.safeLoad(fs.readFileSync(filename));
};

const register = (extensions = DEFAULT_EXTENSIONS, handler = yamlLoader) => {
  restore();

  extensions.forEach((ext) => {
    oldHandlers[ext] = require.extensions[ext];
    require.extensions[ext] = handler;
  });
};

register();

export default register;
