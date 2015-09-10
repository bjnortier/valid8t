var isObject = require('lodash.isobject');
var isArray = require('lodash.isarray');

function valid8t(data, schema) {
  if (!isObject(schema)) {
    throw new Error('invalid schema');
  }

  switch (schema.type) {
    case 'object':
      return isObject(data) && !isArray(data);
    case 'array':
      return isArray(data);
    case 'string':
      return typeof data === 'string';
    case 'number':
      return typeof data === 'number';
    default:
      throw new Error('schema must have a type');
  } 
}

module.exports = valid8t;