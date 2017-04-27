require('./../../src/tool/test-signature')(__filename);

var varType = require('./../../index')({}).type();

function CustomObject() { }
var und = {};

describe('reads types', function () {
    it('basic ctypes', function () {
        expect(varType.is(123)).toBe('number.int');
        expect(varType.is(2.71828)).toBe('number.float');
        expect(varType.is(6.022E23)).toBe('number.scientific');
        expect(varType.is({})).toBe('object');
        expect(varType.is(new CustomObject())).toBe('object.CustomObject');
        expect(varType.is([])).toBe('array');
        expect(varType.is(new Array())).toBe('array');
        expect(varType.is(und.notSet)).toBe('undefined');
    });
});
