'use strict';

const fs = require('fs-extra');
const loader = require('js-yaml/lib/js-yaml/loader');
const read = function (filename, options) {
  options = {
    multi: false,
    filename,
    ...options
  };

  return fs
    .readFile(filename, 'utf8')
    .then((string) => parseYaml(string, options));
};

read.sync = function (filename, options) {
  options = {
    multi: false,
    filename,
    ...options
  };

  return parseYaml(fs.readFileSync(filename, 'utf8'), options);
};

function parseYaml(string, options) {
  if (options.multi) {
    return loader.safeLoadAll(string, options);
  }

  return loader.safeLoad(string, options);
}

read.YAMLException = require('js-yaml/lib/js-yaml/exception');
read.FAILSAFE_SCHEMA = require('js-yaml/lib/js-yaml/schema/failsafe');
read.JSON_SCHEMA = require('js-yaml/lib/js-yaml/schema/json');
read.CORE_SCHEMA = require('js-yaml/lib/js-yaml/schema/core');
read.DEFAULT_SAFE_SCHEMA = require('js-yaml/lib/js-yaml/schema/default_safe');
read.DEFAULT_FULL_SCHEMA = require('js-yaml/lib/js-yaml/schema/default_full');

module.exports = read;
