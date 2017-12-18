const day = '01';
const dayPath = `../${day}`;

const assert = require('assert');
const { prepare } = require('aoc-runner');
const dayContents = require(dayPath);
const [p1, p2] = prepare(dayContents);

describe(`day ${day}`, () => {
    it('should work on samples for p1', () => {
        assert.equal(p1('R5, L5, R5, R3'), 12);
    });
    
    it('should work on samples for p2', () => {
        assert.equal(p2('R8, R4, R4, R8'), 4);
    });
});