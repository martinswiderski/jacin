require('./../../src/tool/test-signature')(__filename);

var jacin = require('./../../index'),
    obj = jacin({});

describe('reads types', function () {
    it('basic ctypes', function () {
        expect(obj.type().is(123)).toBe('int');
        expect(obj.type().is(2.71828)).toBe('float');
        expect(obj.type().is({})).toBe('object');
        expect(obj.type().is([])).toBe('array');
    });
});
