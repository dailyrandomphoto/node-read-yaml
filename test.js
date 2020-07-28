'use strict';

const { writeFileSync, unlinkSync } = require('fs');
const { resolve } = require('path');
const { expect } = require('chai');
const read = require('node-read-yaml');
const filename = resolve(__dirname, '.test.yml');
const yamlText1 = `
_id: 0g3043l9tm
name: Example
url: https://example.com/
desc: About example.
langs: [en,zh]
`;
const yamlText2 = `
_id: 0g3043l9tm
name: Example
url: https://example.com/
desc: About example.
langs: [en,zh]
---
_id: 0g3043l9tm
name: Example
url: https://example.com/
desc: About example.
langs: [en,zh]
`;

describe('node-read-yaml', () => {
  afterEach(() => {
    try {
      unlinkSync(filename);
    } catch (error) {
      // ignore error
      console.debug(error.message);
    }
  });

  describe('asynchronously', () => {
    it('should return a JSON object.', () => {
      writeFileSync(filename, yamlText1);
      return read(filename).then((json) => {
        console.log(json);
        expect(json).to.be.a('object');
      });
    });

    it('with option multi: true - should return an array when read a multi-document.', () => {
      writeFileSync(filename, yamlText2);
      return read(filename, { multi: true }).then((json) => {
        console.log(json);
        expect(json).to.be.an('array').with.lengthOf(2);
        expect(json[0]).to.be.an('object');
      });
    });

    it('with option multi: true - should return an array when read a single-document.', () => {
      writeFileSync(filename, yamlText1);
      return read(filename, { multi: true }).then((json) => {
        console.log(json);
        expect(json).to.be.an('array').with.lengthOf(1);
        expect(json[0]).to.be.an('object');
      });
    });

    it('should throw an error when it cannot parse the file as YAML.', () => {
      return read('README.md')
        .then(() => expect.fail('should not come to here'))
        .catch((error) => {
          expect(error.name).not.to.be.eql('AssertionError');
          expect(error.name).to.be.eql('YAMLException');
        });
    });

    it('should throw an error when it cannot read the file.', () => {
      return read('__nofile__')
        .then(() => expect.fail('should not come to here'))
        .catch((error) => {
          expect(error.name).not.to.be.eql('AssertionError');
          expect(error.name).not.to.be.eql('YAMLException');
          expect(error.name).to.be.eql('Error');
          expect(error.message).to.have.string('no such file or directory');
        });
    });
  });

  describe('synchronously', () => {
    it('should return a JSON object.', () => {
      writeFileSync(filename, yamlText1);
      const json = read.sync(filename);
      console.log(json);
      expect(json).to.be.a('object');
    });

    it('with option multi: true - should return an array when read a multi-document.', () => {
      writeFileSync(filename, yamlText2);
      const json = read.sync(filename, { multi: true });
      console.log(json);
      expect(json).to.be.an('array').with.lengthOf(2);
      expect(json[0]).to.be.an('object');
    });

    it('with option multi: true - should return an array when read a single-document.', () => {
      writeFileSync(filename, yamlText1);
      const json = read.sync(filename, { multi: true });
      console.log(json);
      expect(json).to.be.an('array').with.lengthOf(1);
      expect(json[0]).to.be.an('object');
    });

    it('should throw an error when it cannot parse the file as YAML.', () => {
      expect(() => read.sync('README.md')).to.throw(read.YAMLException);
    });

    it('should throw an error when it cannot read the file.', () => {
      const func = () => read.sync('__nofile__');
      expect(func).not.to.throw(read.YAMLException);
      expect(func).to.throw(Error, 'no such file or director');
    });
  });
});
