const ramda = require('ramda');
const { __, compose, map, filter, when, add, subtract, split, prop, gt, lt, join, reduce, complement, contains } = ramda;
const { probe } = require('aoc-helpers');

// Key is String | Number
// Move is (Key -> Key)
// Direction is 'U' | 'D' | 'L' | 'R'

// { Direction: Move }
const moveMap = {
    U: when(gt(__, 3), subtract(__, 3)),
    D: when(lt(__, 7), add(3)),
    L: when(x => x % 3 !== 1, subtract(__, 1)),
    R: when(x => x % 3 !== 0, add(1))
};

// String -> [Move]
const parseLine = moveTypes => compose(
    map(prop(__, moveTypes)),
    split('')
);

// { pressed: [Key], last: Key } -> [Move] -> { pressed: [Key], last: Key }
const digit = ({ pressed, last }, moves) => compose(
    r => ({ pressed: [...pressed, r], last: r }),
    reduce(
        (c, n) => n(c),
        last
    )
)(moves);

// [String] -> String
const pressCode = moveTypes => compose(
    join(''),
    prop('pressed'),
    reduce(
       digit,
       { pressed: [], last: 5 }
    ),
    map(parseLine(moveTypes)),
);

// [String] -> String
const p1 = pressCode(moveMap);

// { Key: Key } -> Key -> Key
const fancyMove = transitions => c => transitions[c] || c;

// { Direction: Move }
const fancyMoveMap = {
    U: fancyMove({ '3': '1', '6': '2', '7': '3', '8': '4', 'A': '6', 'B': '7', 'C': '8', 'D': 'B' }),
    D: fancyMove({ '1': '3', '2': '6', '3': '7', '4': '8', '6': 'A', '7': 'B', '8': 'C', 'B': 'D' }),
    L: fancyMove({ '3': '2', '4': '3', '6': '5', '7': '6', '8': '7', '9': '8', 'B': 'A', 'C': 'B' }),
    R: fancyMove({ '2': '3', '3': '4', '5': '6', '6': '7', '7': '8', '8': '9', 'A': 'B', 'B': 'C' }),
}

// [String] -> String 
const p2 = pressCode(fancyMoveMap);

module.exports = {
    solution: {
        type: 'lines',
        ps: [p1, p2]
    }
};