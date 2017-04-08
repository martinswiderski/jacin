require('./../../src/tool/test-signature')(__filename);

var jacin = require('./../../index');

describe('Implements getJsonpath()', function () {

    var document = '{"details":{"firstName":"John","lastName":"Smith","isAlive":true,"gender":"male","confidential":{"age":25,"sexualOrientation":"prefer not to disclose","address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"mobile","number":"123 456-7890"}],"children":[],"spouse":null}}}',
        person = jacin(document);

    it('can read nested JSON documents using JSONPath', function () {
        expect(person.getJsonpath('$..details.firstName')).toBe('John');
        expect(person.getJsonpath('$..details.firstName')).toBe('John');
        expect(person.getJsonpath('$..details.firstName')).toBe('John');
        expect(person.getJsonpath('$..details.confidential.phoneNumbers[0].number').toString()).toBe('212 555-1234');
        expect(
            JSON.stringify(person.getJsonpath('$..details'))
        ).toBe(
            '{"firstName":"John","lastName":"Smith","isAlive":true,"gender":"male","confidential":{"age":25,"sexualOrientation":"prefer not to disclose","address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"mobile","number":"123 456-7890"}],"children":[],"spouse":null}}'
        );
        expect(typeof person.getJsonpath('$..details', true)).toBe('object');
        expect(typeof person.getJsonpath('$..details', true).id()).toBe('number');
        expect(
            person.getJsonpath('$..details', true).toJSON()
        ).toBe(
            '{"firstName":"John","lastName":"Smith","isAlive":true,"gender":"male","confidential":{"age":25,"sexualOrientation":"prefer not to disclose","address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"mobile","number":"123 456-7890"}],"children":[],"spouse":null}}'
        );
    });

    var mine = {
            me: {
                hobby: [
                    'motocross',
                    'sport shooting',
                    'photography'
                ],
                work: [
                    'software',
                    'movie star'
                ],
                title: 'marquis'
            }
        },
        me = jacin(mine);

    it('can read nested JSON documents using JSONPath', function () {
        expect(me.getJsonpath('$..me.work[0]')).toBe('software');
        expect(me.getJsonpath('$..me.work')[0]).toBe('software');
        expect(me.getJsonpath('$..me.work[1]')).toBe('movie star');
        expect(me.getJsonpath('$..me.work')[1]).toBe('movie star');
        expect(JSON.stringify(me.getJsonpath('$..me.work'))).toBe('["software","movie star"]');
        expect(me.getJsonpath('$..me.title')).toBe('marquis');
        expect(me.getJsonpath('$..me.title[0]')).toBe('m'); // first letter

        expect(me.getJsonpath('$.me.work[0]')).toBe('software');
        expect(me.getJsonpath('$.me.work')[0]).toBe('software');
        expect(me.getJsonpath('$.me.work[1]')).toBe('movie star');
        expect(me.getJsonpath('$.me.work')[1]).toBe('movie star');
        expect(JSON.stringify(me.getJsonpath('$.me.work'))).toBe('["software","movie star"]');
        expect(me.getJsonpath('$.me.title')).toBe('marquis');
        expect(me.getJsonpath('$.me.title[0]')).toBe('m'); // first letter
    });
});

describe('Implements setJsonpath()', function () {

    /**
     *
    var yours = {
            me: {
                hobby: [
                    'motocross',
                    'sport shooting',
                    'photography'
                ],
                work: [
                    'software',
                    'movie star'
                ],
                title: 'marquis'
            }
        },
        you = jacin(yours);
     *
     */

    it('can read nested JSON documents using JSONPath', function () {
        //expect(you.setJsonpath('$..me.hobby[3]', 'just-added')).toBe(true);
        //expect(you.getJsonpath('$..me.hobby[3]')).toBe('just-added');
        //expect(you.setJsonpath('$..me.title', 'duke')).toBe(true);
        //expect(you.getJsonpath('$..me.title')).toBe('duke');
    });
});
