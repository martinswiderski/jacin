require('./../../src/tool/test-signature')(__filename);

var jacin = require('./../../index'),
    obj = jacin({});

function CustomObject() {

}

describe('reads types', function () {
    it('basic ctypes', function () {
        expect(obj.type().is(123)).toBe('number.int');
        expect(obj.type().is(2.71828)).toBe('number.float');
        expect(obj.type().is(6.022E23)).toBe('number.scientific');
        expect(obj.type().is({})).toBe('object');
        expect(obj.type().is(new CustomObject())).toBe('object.CustomObject');
        expect(obj.type().is([])).toBe('array');
    });
});
