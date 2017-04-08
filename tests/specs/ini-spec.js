require('./../../src/tool/test-signature')(__filename);

var ini       = require('./../../src/ini'),
    iniFile     = __dirname + '/../props/config.ini',
    iniAsString = [
        '[SectionOne]',
        '',
        'key = value',
        'integer = 1234',
        'real = 3.14',
        'string1 = \'Case 1\'',
        'string2 = "Case 2"',
        'multivalue[] = first',
        'multivalue[] = second',
        '',
        '[SectionTwo]',
        '',
        'key = new value# after hash comment and not a value',
        'key2 = \'trimmed\' # after hash comment and not a value',
        'integer = 1234  # after hash comment and not a value',
        'real = 3.14     # after hash comment and not a value',
        'string1 = \'Case 1\'     # after hash comment and not a value',
        'string2 = "Case 2"     # after hash comment and not a value',
        'multivalue[] = first   # after hash comment and not a value',
        'multivalue[] = second  # after hash comment and not a value'
    ].join('\n');

describe('INI implementation', function () {
    it('has default encoding', function () {
        expect(ini.encoding()).toBe('utf-8');
    });

    console.log('File #1');
    console.log(ini.readFile(iniFile));
    console.log('File #2');
    console.log(ini.readFile('/made/this/one/up.ini'));
    console.log('String #1');
    console.log(ini.readFile(iniAsString));
    console.log('String #2');
    console.log(ini.readFile('BDDD'));

    it('reads file', function () {
        expect(typeof ini.readFile(iniFile)).toBe('object');
        expect(typeof ini.readFile('/made/this/one/up.ini')).toBe('boolean');
    });

    it('reads string', function () {
        expect(typeof ini.readString(iniAsString)).toBe('object');
        expect(ini.readString(iniAsString).SectionTwo.key).toBe('new value');
        expect(ini.readString(iniAsString).SectionTwo.key2).toBe('trimmed');
        expect(ini.readString(iniAsString).SectionTwo.string2).toBe('Case 2');
        expect(ini.readString(iniAsString).SectionTwo.multivalue).toBe(['first','second']);
        expect(typeof ini.readString('BDDD')).toBe('object');
        expect(ini.readString('BDDD').BDDD).toBe(true);
    });
});

