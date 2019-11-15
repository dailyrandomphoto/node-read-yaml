# node-read-yaml

[![NPM Version][npm-version-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![dependencies Status][dependencies-image]][dependencies-url]
[![devDependencies Status][devDependencies-image]][devDependencies-url]

Read and parse a YAML file. A wrapper of [`js-yaml`](https://github.com/nodeca/js-yaml) read file directly.

```js
const read = require('node-read-yaml');

const doc = read.sync(filename);
console.log(doc);
```

same as

```js
const fs = require('fs');
const yaml = require('js-yaml');

const doc =  yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
console.log(doc);
```

## Installation

```sh
npm install node-read-yaml
```

## API

### read (filename [ , options ]) | read.sync (filename [ , options ])
Read a YAML file and parse content as JSON.
Returns either a plain object, an array, a string or undefined, or throws YAMLException on error. By default, does not support regexps, functions and undefined. This method is safe for untrusted data.
[more](https://github.com/nodeca/js-yaml#api)

options:

- `multi` _(default: false)_ - If true, then reads file as multi-document and returns an array.
- `onWarning` _(default: null)_ - function to call on warning messages.
  Loader will call this function with an instance of `YAMLException` for each warning.
- `schema` _(default: `DEFAULT_SAFE_SCHEMA`)_ - specifies a schema to use.
  - `FAILSAFE_SCHEMA` - only strings, arrays and plain objects:
    http://www.yaml.org/spec/1.2/spec.html#id2802346
  - `JSON_SCHEMA` - all JSON-supported types:
    http://www.yaml.org/spec/1.2/spec.html#id2803231
  - `CORE_SCHEMA` - same as `JSON_SCHEMA`:
    http://www.yaml.org/spec/1.2/spec.html#id2804923
  - `DEFAULT_SAFE_SCHEMA` - all supported YAML types, without unsafe ones
    (`!!js/undefined`, `!!js/regexp` and `!!js/function`):
    http://yaml.org/type/
  - `DEFAULT_FULL_SCHEMA` - all supported YAML types.
- `json` _(default: false)_ - compatibility with JSON.parse behaviour. If true, then duplicate keys in a mapping will override values rather than throwing an error.

#### Examples

**asynchronously read a file**
```js
const read = require('node-read-yaml');

read('config.yml')
  .then(doc => console.log(doc))
  .catch(err => console.error(err));
```
wrapper of `require('js-yaml').safeLoad`

**asynchronously read multi-document file**
```js
const read = require('node-read-yaml');

read('config.yml', {multi: true})
  .then(arr => arr.forEach(doc => console.log(doc)))
  .catch(err => console.error(err));
```
wrapper of `require('js-yaml').safeLoadAll`

**synchronously read a file**
```js
const readSync = require('node-read-yaml').sync;

try {
  const doc = readSync('config.yml');
  console.log(doc);
} catch (err) {
  console.log(err);
}
```
wrapper of `require('js-yaml').safeLoad`

**synchronously read multi-document file**
```js
const readSync = require('node-read-yaml').sync;

try {
  const arr = readSync('config.yml', {multi: true});
  arr.forEach(doc => console.log(doc))
} catch (err) {
  console.log(err);
}
```
wrapper of `require('js-yaml').safeLoadAll`

### read.YAMLException
`require('js-yaml').YAMLException`

## Related

- [node-read-yaml-files](https://github.com/dailyrandomphoto/node-read-yaml-files) - Read and parse YAML files in a directory and its subdirectories.
- [js-yaml](https://github.com/nodeca/js-yaml) - JavaScript YAML parser and dumper. Very fast.

## License
Copyright (c) 2019 [dailyrandomphoto][my-url]. Licensed under the [MIT license][license-url].

[my-url]: https://github.com/dailyrandomphoto
[npm-url]: https://www.npmjs.com/package/node-read-yaml
[travis-url]: https://travis-ci.org/dailyrandomphoto/node-read-yaml
[coveralls-url]: https://coveralls.io/github/dailyrandomphoto/node-read-yaml?branch=master
[license-url]: LICENSE
[dependencies-url]: https://david-dm.org/dailyrandomphoto/node-read-yaml
[devDependencies-url]: https://david-dm.org/dailyrandomphoto/node-read-yaml?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/node-read-yaml
[npm-version-image]: https://img.shields.io/npm/v/node-read-yaml
[license-image]: https://img.shields.io/npm/l/node-read-yaml
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/node-read-yaml
[coveralls-image]: https://img.shields.io/coveralls/github/dailyrandomphoto/node-read-yaml
[dependencies-image]: https://img.shields.io/david/dailyrandomphoto/node-read-yaml
[devDependencies-image]: https://img.shields.io/david/dev/dailyrandomphoto/node-read-yaml
