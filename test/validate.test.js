var chai = require('chai');
chai.config.includeStack = true;
var assert = chai.assert;

var valid8t = require('../lib/index');

describe('Validation', function() {

  it('must have a type', function() {
    assert.throws(function() {
      valid8t({}, 1);
    }, 'invalid schema');

    var schema = {};
    assert.throws(function() {
      valid8t.isObject({}, schema);
    }, 'schema must have a type');
  });

  it('can check for an object', function() {
    var schema = {
      type: 'object',
    };

    assert.isTrue(valid8t({}, schema));

    assert.isFalse(valid8t('foo', schema));
    assert.isFalse(valid8t([], schema));
    assert.isFalse(valid8t(1, schema));
  });

  it('can check for an array', function() {
    var schema = {
      type: 'array',
    };

    assert.isTrue(valid8t([], schema));
    
    assert.isFalse(valid8t('foo', schema));
    assert.isFalse(valid8t({}, schema));
    assert.isFalse(valid8t(1, schema));
  });

  it('can check for a number', function() {
    var schema = {
      type: 'number',
    };

    assert.isTrue(valid8t(1, schema));
    assert.isTrue(valid8t(-1, schema));
    assert.isTrue(valid8t(2.0, schema));
    assert.isTrue(valid8t(-2e7, schema));

    assert.isFalse(valid8t('foo', schema));
    assert.isFalse(valid8t([], schema));
    assert.isFalse(valid8t({}, schema));
  });

  it('can check for a string', function() {
    var schema = {
      type: 'string',
    };
    assert.isTrue(valid8t('foo', schema));
    assert.isFalse(valid8t(1, schema));
    assert.isFalse(valid8t([], schema));
    assert.isFalse(valid8t({}, schema));
  });

});

