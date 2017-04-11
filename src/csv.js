'use strict';

var CSV = require('csv-string');

function flattenObject(input) {
    throw new Error('@todo: Implement ' + flattenObject);
}

function loadCsvFile(file) {
    throw new Error('@todo: Implement ' + flattenObject);
}

function outputCsvString(object) {
    throw new Error('@todo: Implement ' + flattenObject);
}

function readCsvString(string) {
    throw new Error('@todo: Implement ' + flattenObject);
}

module.exports = {
    parse: readCsvString,
    load: loadCsvFile,
    stringify: outputCsvString,
    _flatten: flattenObject
};
