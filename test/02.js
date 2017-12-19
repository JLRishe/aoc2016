const day = '02';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    const sampleInput = 
`ULL
RRDDD
LURDL
UUUUD`;
    
    it('should work on samples for p1', () => {
        assert.equal(p1(sampleInput), '1985');
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2(sampleInput), '5DB3');
    });
});