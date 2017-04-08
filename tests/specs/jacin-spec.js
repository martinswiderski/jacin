require('./../../src/tool/test-signature')(__filename);

var jacin = require('./../../index');

describe('Takes STRING input', function () {

    var myObj = {
        my: {
            little: [
                'pony',
                'Dr Dolittle'
            ]
        }
    };

    it('as object', function () {
        expect(jacin(myObj).isValid()).toBe(true);
        expect(jacin('boo').isValid()).toBe(false);
    });

    it('as JSON file', function () {
        expect(jacin(__dirname + '/../../package.json').isValid()).toBe(true);
        expect(jacin(__dirname + '/../../package.json').main).toBe('index.js');
        expect(jacin(__dirname + '/../../package.json').name).toBe('jacin');
        expect(jacin(__dirname + '/../../package.json').description).toBe('Jacin, a JSON manipulation toolkit');
    });

    it('as YAML file', function () {
        expect(jacin(__dirname + '/../props/animals.yml').isValid()).toBe(true);
        expect(jacin(__dirname + '/../props/animals.yml').mary).toBe('One lamb');
        expect(jacin(__dirname + '/../props/animals.yml').all.rubber.duck).toBe('part-time');
    });

    var jsonString = '{"name":"jacin","version":"0.0.2","description":"Jacin, a JSON manipulation toolkit","keywords":["JSON","data","jacin","manipulation","delta","merge","diff","JavaScript","Object","Notation"],"main":"index.js","directories":{"test":"tests/specs/"},"dependencies":{"md5":"^2.2.1","nyc":"^10.2.0","yamljs":"^0.2.9"},"devDependencies":{"bash-color":"0.0.4","eslint":"^3.19.0","istanbul":"^0.4.5","jasmine-node":"^1.14.5"},"scripts":{"tests-sign-md5":"cd tests/specs/; ./sign-tests; cd ../../","rebuild":"rm -fr node_modules; npm install; npm test","test":"alias jasmine-node=./node_modules/.bin/jasmine-node; jasmine-node --growl tests/specs/"},"repository":{"type":"git","url":"git+https://martinswiderski@github.com/red-puppet/jacin.git"},"author":"Martin Swiderski","maintainers":[{"name":"red-puppet","email":"red@8ig.uk"},{"name":"codebloke","email":"codebloke@gmail.com"}],"license":"MIT","bugs":{"url":"https://github.com/red-puppet/jacin/issues"},"homepage":"https://github.com/red-puppet/jacin#readme"}',
        yamlAnimals = [
            'mary: \'One lamb\'',
            'john:',
            '    - goat',
            '    - dog',
            '    - duck',
            'all:',
            '    rubber:',
            '        duck: part-time',
            ''
        ].join('\n');

    it('as JSON string', function () {
        expect(jacin(jsonString).isValid()).toBe(true);
        expect(jacin(jsonString).main).toBe('index.js');
        expect(jacin(jsonString).name).toBe('jacin');
        expect(jacin(jsonString).description).toBe('Jacin, a JSON manipulation toolkit');
    });

    it('as YAML string', function () {
        expect(jacin(yamlAnimals).isValid()).toBe(true);
        expect(jacin(yamlAnimals).mary).toBe('One lamb');
        expect(jacin(yamlAnimals).all.rubber.duck).toBe('part-time');
    });

    it('broken file', function () {
        expect(jacin(__dirname + '/../../paxckage.json').isValid()).toBe(false);
    });

    it('broken string', function () {
        expect(jacin('{}' + jsonString).isValid()).toBe(false);
    });

});

describe('Generates output', function () {
    var original = {
            mary: 'One lamb',
            john: [
                'goat',
                'dog',
                'duck'
            ],
            all: {
                rubber: {
                    duck: 'part-time'
                }
            }
        },
        read = jacin(original),
        output = {
            object: read.toObject(),
            json: read.toJSON(),
            yaml: read.toYaml()
        },
        expectedYaml = [
            'mary: \'One lamb\'',
            'john:',
            '    - goat',
            '    - dog',
            '    - duck',
            'all:',
            '    rubber:',
            '        duck: part-time',
            ''
        ];

    // manipulations to the exported one
    output.object.mary = 'Only changed in object clone';
    output.object.all.rubber = {duck: 'none', kittens: 'part-time'};

    it('as JSON', function () {
        expect(typeof output.json).toBe('string');
        expect(output.json).toBe('{"mary":"One lamb","john":["goat","dog","duck"],"all":{"rubber":{"duck":"part-time"}}}');
    });
    it('as YAML', function () {
        expect(typeof output.yaml).toBe('string');
        expect(output.yaml).toBe(expectedYaml.join('\n'));
    });
    it('as a Native (and separate) Javascript object', function () {
        expect(original.mary).toBe('One lamb');
        expect(original.all.rubber.duck).toBe('part-time');
        expect(typeof original.all.rubber.kittens).toBe('undefined'); // does not exist yet
        expect(output.object.all.rubber.duck).toBe('none');           // changed
        expect(output.object.all.rubber.kittens).toBe('part-time');   // changed
        expect(output.object.mary).toBe('Only changed in object clone');
    });

});

