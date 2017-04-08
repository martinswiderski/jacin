'use strict';

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
if (!String.prototype.dequote) {
    String.prototype.dequote = function (quote) {
        if (this[0] === quote && this[(this.length-1)] === quote) {
            // substring here
        }

    };
}

var ini = require('ini'),
    fs = require('fs'),
    _defaultEncoding = 'utf-8';

/**
 * Problem:
 * v. 1.3.4 of [ini] does not understand quotes
 * and # all after first = is returned with no trim,
 * no unquote resulting in passing spaces wrapping values
 *
 * Solution:
 * - shrinkwrap ini version
 * - add quote "bleach"
 * - add trim
 * - must support recurence to cater for multi level
 */


function _fixValue(input) {
    return (new String(input)).trim().dequote('"').dequote('\'').valueOf();
}

/**
 * Reads file
 * @param string filename Exisiting .ini file
 * @returns object|boolean
 */
function parseIniFile(file) {
    try {
        return parseIniString(
            fs.readFileSync(
                file,
                getEncoding()
            )
        );
    } catch (err) {
        console.log(err);
        return false;
    }
}

function parseIniString(string) {
    try {
        var ob = ini.parse(string);
        console.log('Parsed string');
        console.log(ob);
        return (typeof ob !== 'object') ? false : ob; // @todo: inject fix
    } catch (err) {
        console.log(err);
        return false;
    }
}

function outputIniString(ob) {
    return (typeof ob === 'object') ? ini.stringify(ob) : false;
}

function getEncoding() {
    return _defaultEncoding;
}

module.exports = {
    encoding: getEncoding,
    readFile: parseIniFile,
    readString: parseIniString,
    outputString: outputIniString
};
