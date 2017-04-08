require('./../../src/tool/test-signature')(__filename);

var jacin = require('./../../index');

describe('Implements clone()', function () {

    var jsonString2 = '{"name":"jacin","version":"0.0.2","description":"Jacin, a JSON manipulation toolkit","keywords":["JSON","data","jacin","manipulation","delta","merge","diff","JavaScript","Object","Notation"],"main":"index.js","directories":{"test":"tests/specs/"},"maintainers":[{"name":"red-puppet","email":"red@8ig.uk"},{"name":"codebloke","email":"codebloke@gmail.com"}]}',
        json1 = jacin(jsonString2),
        json2 = json1.clone();

    it('creates a clone with different id()', function () {
        expect(typeof json1.id()).toBe('number');
        expect(typeof json2.id()).toBe('number');
        expect(json1.id() < json2.id()).toBe(true);
        expect(typeof json1.toJSON()).toBe('string');
        expect(json1.toJSON().length > 0).toBe(true);
        expect(json1.toJSON()).toBe(json2.toJSON());
        expect(json1.version).toBe('0.0.2');
        expect(json2.version).toBe('0.0.2');
        expect((JSON.parse(jsonString2)).version).toBe('0.0.2');
    });
});

