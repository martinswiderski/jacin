'use strict';

var _c = 0,
    _type = require('./type'),
    _md5 = require('md5'),
    _sha1 = require('sha1'),
    _crc32 = require('crc-32'),
    _jsonpath = require('./jsonpath'),
    _yaml = require('yamljs'),
    _export = {},
    _error = require('./jacin-error'),
    _configIni = require('config.ini'),
    _ext = '',
    _excl = {
        key: {
            ___is_id: true,
            ___valid: true
        },
        type: {
            function: true
        }
    };

function fetchLast(arr) {
    return arr[(arr.length-1)].length < 5 ? arr[(arr.length-1)].toLocaleLowerCase() : false;
}

function fileExtension(file) {
    if (typeof file.indexOf === 'function' && file.indexOf('.') > -1) {
        if (typeof file.split === 'function') {
            return fetchLast(file.split('.'));
        }
    }
    return file;
}

function readInput(input) {
    var r = [
        readObject(input),
        readFile(input),
        readString(input)
    ];
    for (var i=0; i<3; i++) if (typeof r[i] === 'object') return r[i];
    return false;
}

function readObject(obj) {
    try {
        return (typeof obj === 'object' && JSON.stringify(obj).substring(0, 1) === '{') ? obj : false;
    } catch (err) {
        return false;
    }
}

function readFile(file) {
    var ob;
    try {
        _ext = fileExtension(file);
        if (_ext === 'json') {
            ob = require(file);
        } else if (_ext === 'yaml' || _ext === 'yml') {
            ob = _yaml.load(file);
        } else if (_ext === 'ini') {
            ob = _configIni.load(file);
        } else {
            throw new _error('Unknown extension ' + _ext);
        }

    } catch (err) {
        return false;
    }
    return ob;
}

/**
 * Sets value to Javascript object
 *
 * @param object obj  Values are set within this one
 * @param string path Path is parsed and used iv valid
 * @param mixed value
 *
 * @return boolean
 */
function setNestedValue(obj, path, value) {
    try {

        // placeholder

    } catch (err) {
        console.log(err.message);
        return false;
    }
}

function readString(input) {
    var ob;
    try {
        try {
            ob = JSON.parse(input);
        } catch (notJson) {
            ob = _yaml.parse(input);
            if (typeof ob !== 'object') {
                ob = false; // reset
            }
        }

    } catch (err) {
        return false;
    }
    return ob;
}

function _jacin() {
    var ob,
        _valid = false,
        _id = ++_c,
        _custom = false,
        _changeReg = {}; // placeholder

    this.type = function() {
        return _type;
    };

    this.isValid = function() {
        return (_valid === true);
    };

    this.setCustomHash = function(yours) {
        if (typeof yours === 'function') {
            _custom = yours;
        }
        return this;
    };

    this.hash = function(input) {
        if (typeof _custom === 'function') {
            input = (typeof input === 'undefined') ? this.toJSON() : input;
            return _custom(input, this);
        } else {
            return '';
        }
    };

    this.id = function () {
        return _id;
    };

    this.clone = function() {
        var _tmp = this.toJSON();
        return (new _jacin()).read(_tmp).setCustomHash(_custom);
    };

    this.read = function(input) {
        ob = readInput(input);
        if (typeof ob === 'object') {
            for (var k in ob) {
                _valid = true;
                this[k] = ob[k];
            }
        }
        return this;
    };

    this.crc32 = function(input) {
        input = (typeof input === 'undefined') ? this.toJSON() : input;
        return _crc32.str(input);
    };

    this.md5 = function(input) {
        input = (typeof input === 'undefined') ? this.toJSON() : input;
        return _md5(input);
    };

    this.sha1 = function(input) {
        input = (typeof input === 'undefined') ? this.toJSON() : input;
        return _sha1(input);
    };

    this.toJSON = function (beautify) {
        return (beautify !== true) ? JSON.stringify(this._object()) : JSON.stringify(this._object(), null, 4);
    };

    this._object = function() {
        _export  = {};
        for (var k in this) {
            if (!_excl.key[k] && !_excl.type[typeof this[k]]) _export[k] = this[k];
        }
        return _export;
    };

    this.toObject = function() {
        return JSON.parse(JSON.stringify(this._object()));
    };

    this.toYaml = function() {
        return _yaml.stringify(this._object(), 4);
    };

    this.toIni = function() {
        return _configIni.stringify(this._object());
    };


    this.getJsonpath = function(input, jacin) {
        return (jacin === true)
            ? (new _jacin()).read(_jsonpath(this, input))
            : _jsonpath(this, input);

    };
}

module.exports = function jacin(json) {
    return new _jacin().read(json);
};

