const ramda = require('ramda');
const { __, compose, map, filter, curry, prop, reduce, split, groupBy, indexBy, gt, length, values, head, sortBy, times, nth } = ramda;
const { probe, applyPattern, add1 } = require('aoc-helpers');

// WalkState is { d: Direction, n: Number, pos: Point, visited: [{ n: Number, pos: Point }] }

const dMap = {
    R: ({ dx, dy }) => ({ dx:  dy, dy: -dx }),
    L: ({ dx, dy }) => ({ dx: -dy, dy:  dx })
};

// String -> Step
const parseStep = compose(
    ([, d, s]) => ({ d: dMap[d], s: Number(s) }),
    applyPattern(/^([RL])(\d+)/)
);

// Direction -> Number -> Point -> Point
const advance = ({ dx, dy }, count, { x, y }) => 
    ({ x: x + count * dx, y: y + count * dy }
);

// Number -> Direction -> Number -> Point -> [{ n: Number, pos: Point }]
const pointsOnStep = (n, d, s, pos) => map(
    x => ({ n: n + x, pos: advance(d, x, pos) }),
    times(add1, s)
);

// WalkState -> Step -> WalkState
const takeStep = curry(({ d: startD, pos, visited, n }, { d: dChange, s }) => {
    const d = dChange(startD);
    
    return { 
        d,
        n: n + s,
        pos: advance(d, s, pos), 
        visited: [...visited, ...pointsOnStep(n, d, s, pos)]
    }
});

// [Step] -> WalkState
const walkSteps = reduce(
    takeStep,
    { d: { dx: 0, dy: 1 }, pos: { x: 0, y: 0 }, visited: [], n: 0 }
);

// String -> WalkState
const walkInputs = compose(
    walkSteps,
    map(parseStep),
    split(', ')
);

// Point -> Number
const distFromStart = ({ x, y }) => Math.abs(x) + Math.abs(y);

// WalkState -> Number
const p1 = compose(
    distFromStart,
    prop('pos')
);

// [*] -> Boolean
const longerThanOne = compose(gt(__, 1), length);

// (a -> Ord) -> [a] -> a
const leastBy = curry((f, xs) => head(sortBy(f, xs)));

// WalkState -> Number
const p2 = compose(
    distFromStart,
    prop('pos'),
    leastBy(prop('n')),
    // we want the first place that was revisited, so look at 
    // second item in each group
    map(nth(1)),
    filter(longerThanOne),
    values,
    groupBy(({ pos: { x, y } }) => x + ',' + y),
    prop('visited')
);

module.exports = {
    solution: {
        type: '',
        pre: walkInputs,
        ps: [p1, p2]
    }
};