'use strict';

var ini = require('ini'),
    fs = require('fs'),
    _defaultEncoding = 'utf-8';

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
        return (typeof ob !== 'object') ? false : ob;
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
