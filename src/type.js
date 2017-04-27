'use strict';

/***
 * Boolean.
 * Null.
 * Undefined.
 * Number. int, real
 * String.
 * Object, native, array, etc.
 */


var _validTypes = {
        'null': true,
        boolean: true,
        'undefined': true,
        string: true,
        int: true,
        float: true,
        number: true,
        object: true,
        array: true
    };

function _isNumber(num) {
    console.log(num);
    if (typeof num === 'number') {
        if (parseInt(num)+'' === num+'') {
            console.log(parseInt(num)+'');
            console.log(num);
            return 'int';
        } else if (parseFloat(num)+'' === num+'') {
            console.log(parseFloat(num)+'');
            console.log(num);
            return 'float';
        } else {
            return 'boo';
        }
    }
    return false;
}

var _type = {
    'array': function (ob) { return (typeof ob.length === 'number' && typeof ob.push === 'function' ) },
    object: function (ob) { return typeof ob === 'object'; },
    number: _isNumber,
    boolean: function (b) { return b === true || b === false},
    'null': function (n) { return n === null; },
    string: function (s) { return typeof s === 'string'; }
};


function getTypeDetails(inspect) {
    for (var t in _type) {
        if (_type[t](inspect) !== false) return t;
    }
    return false; // error a type has slipped
}

module.exports = {
    is: getTypeDetails
};
