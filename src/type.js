'use strict';

var _t;

function _objName(obj) {
    if (typeof obj === 'object') {
        return (obj.constructor.name !== 'Object') ? '.'+obj.constructor.name : '';
    }
    return false;
}

function _isInt(num) {
    if ((new String(num)).indexOf('.') < 0) {
        if (parseInt(num) + '' === num + '') {
            return 'number.int';
        }
    }
    return false;
}

function _isFloat(num) {
    if (parseFloat(num) + '' === num + '') {
        if ((new String(num)).toLocaleLowerCase() !== (new String(num)).toLocaleUpperCase()) {
            return 'number.scientific';
        }
        return 'number.float';
    }
    return false;
}

var _type = {
    'undefined': function (u) { return typeof u === 'undefined' ? 'undefined' : false; },
    'array': function (ob) { return (typeof ob.length === 'number' && typeof ob.push === 'function' ) ? 'array' : false; },
    'object': function (ob) { return typeof ob === 'object' ? 'object'+_objName(ob) : false; },
    'int': _isInt,
    'float': _isFloat,
    'boolean': function (b) { return b === true || b === false ? 'boolean' : false; },
    'null': function (n) { return n === null ? 'null' : false; },
    'string': function (s) { return typeof s === 'string' ? 'string' : false; }
};

function getTypeDetails(inspect) {
    for (var t in _type) {
        _t = _type[t](inspect);
        if (_t !== false) return _t;
    }
    return typeof inspect; // error a type has slipped
}

module.exports = {
    is: getTypeDetails
};
