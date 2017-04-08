require('./../../src/tool/test-signature')(__filename);

var jacin = require('./../../index'),
    _md5 = require('md5'),
    _sha1 = require('sha1'),
    _crc32 = require('crc-32'),
    animals = jacin(__dirname + '/../props/animals.yml'),
    animalsJson = animals.toJSON();

describe('Implements checksum', function () {

    it('of itself as CRC32 for UTF8', function () {
        expect(animals.crc32()).toBe(_crc32.str(animalsJson));
        expect(animals.crc32()).toBe(-2066597661);
    });
    it('of itself as MD5', function () {
        expect(animals.md5()).toBe(_md5(animalsJson));
        expect(animals.md5()).toBe('a79f6caf83281d08305c88b9c48534ca');
    });
    it('of itself as SHA1', function () {
        expect(animals.sha1()).toBe(_sha1(animalsJson));
        expect(animals.sha1()).toBe('359f8ca0414e6723a685fabfdcdb64c9b29ce337');
    });

    it('or external values as CRC32, SHA1 and MD5', function () {
        expect(animals.crc32('external')).toBe(1481810360);
        expect(animals.md5('external')).toBe('6a21b6995a068148bbb65c8f949b3fb2');
        expect(animals.sha1('external')).toBe('59d8f3ec5b13131f7856e6ed51dca3c6adb97cd4');
    });
});


describe('Implements custom hash functions', function () {

    function hashMyKey(input, self) {
        var welcome = {
            number: true,
            string: true
        };
        if (welcome[typeof input] === true) {
            return (input+'').substring(0, 2) + '-' + self.md5(input); // you can reuse built-ins
        } else {
            return 'ERR';
        }
    }

    function tripleMd5(input, self) {
        return self.md5(self.md5(self.md5(input)));
    }

    var myblank  = jacin(), // no custom
        mycustom = jacin().setCustomHash(hashMyKey),
        myclone  = mycustom.clone(),
        tripleMd5orig = jacin({ this: 'is', name: 'one with other custom hash'}).setCustomHash(tripleMd5),
        tripleMd5clone = tripleMd5orig.clone();

    it('no custom registered - empty string', function () {
        expect(myblank.hash()).toBe('');
        expect(myblank.hash(12345)).toBe('');
        expect(myblank.hash('NYC-City-noise-keeps-me-awake')).toBe('');
    });
    it('custom hash in original', function () {
        expect(mycustom.hash()).toBe('{}-99914b932bd37a50b983c5e7c90ae93b');
        expect(mycustom.hash(12345)).toBe('12-7cfdd07889b3295d6a550914ab35e068');
        expect(mycustom.hash('NYC-City-noise-keeps-me-awake')).toBe('NY-0cbdddc72a1dbbe9fac033c58cf666f6');
    });
    it('custom hash in clone', function () {
        expect(myclone.hash()).toBe('{}-99914b932bd37a50b983c5e7c90ae93b');
        expect(myclone.hash(12345)).toBe('12-7cfdd07889b3295d6a550914ab35e068');
        expect(myclone.hash('NYC-City-noise-keeps-me-awake')).toBe('NY-0cbdddc72a1dbbe9fac033c58cf666f6');
    });
    it('custom hash2', function () {
        expect(tripleMd5orig.this).toBe('is');
        expect(tripleMd5orig.name).toBe('one with other custom hash');
        expect(tripleMd5orig.hash()).toBe('80bd2d6d334d13c66e6baf84153458eb');
        expect(tripleMd5orig.hash(12345)).toBe('65da2f9fbdbf71138f4e14de82ccc7a1');
        expect(tripleMd5orig.hash('NYC-City-noise-keeps-me-awake')).toBe('f19068a7a9fae11f461dd0dfe5d0d777');
    });
    it('custom hash2 clone', function () {
        expect(tripleMd5orig.this).toBe('is');
        expect(tripleMd5orig.name).toBe('one with other custom hash');
        expect(tripleMd5orig.hash()).toBe('80bd2d6d334d13c66e6baf84153458eb');
        expect(tripleMd5orig.hash(12345)).toBe('65da2f9fbdbf71138f4e14de82ccc7a1');
        expect(tripleMd5orig.hash('NYC-City-noise-keeps-me-awake')).toBe('f19068a7a9fae11f461dd0dfe5d0d777');
    });
    it('custom hash2 clone', function () {

        tripleMd5clone.name = 'A clone';

        expect(tripleMd5clone.this).toBe('is');
        expect(tripleMd5clone.name).toBe('A clone');
        // one below differs as it is different content inside clone now
        expect(tripleMd5clone.hash()).toBe('199dbfa8f66ff86340fdb28202554d11');
        expect(tripleMd5clone.hash(12345)).toBe('65da2f9fbdbf71138f4e14de82ccc7a1');
        expect(tripleMd5clone.hash('NYC-City-noise-keeps-me-awake')).toBe('f19068a7a9fae11f461dd0dfe5d0d777');
    });
});

