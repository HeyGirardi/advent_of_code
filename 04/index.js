const utils = require('../utils');

async function main() {
  try {
    const separator = '\n';
    console.log({
      day: 4,
      puzzles: [
        {
          id: 1,
          sample: await puzzle1(__dirname, 'sample', separator),
          answer: await puzzle1(__dirname, 'input', separator),
        },
        {
          id: 2,
          sample: await puzzle2(__dirname, 'sample', separator),
          answer: await puzzle2(__dirname, 'input', separator),
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
}

async function data(dir, file, separator) {
  return (await utils.readFile(dir, file, separator)).map((row) => {
    const pair = row.split(',').map((pair) => {
      const range = pair.split('-').map((x) => +x);
      return {
        low: Math.min(range[0], range[1]),
        high: Math.max(range[0], range[1]),
        overlaps: [],
      };
    });
    return {
      one: pair[0],
      two: pair[1],
    };
  });
}

async function puzzle1(dir, file, separator) {
  return (await data(dir, file, separator)).reduce((count, pair) => {
    const one = pair.one;
    const two = pair.two;
    if (one.low <= two.low && one.high >= two.high) {
      count++;
    } else if (two.low <= one.low && two.high >= one.high) {
      count++;
    }
    return count;
  }, 0);
}

async function puzzle2(dir, file, separator) {
  const hasOverlap = (left, right) => {
    return (
      (left.low >= right.low && left.low <= right.high) ||
      (left.high >= right.low && left.high <= right.high) ||
      (left.low <= right.low && left.high >= right.high)
    );
  };
  return (await data(dir, file, separator)).reduce((overlaps, pair) => {
    const one = pair.one;
    const two = pair.two;
    if (hasOverlap(one, two) || hasOverlap(two, one)) {
      overlaps++;
    }
    return overlaps;
  }, 0);
}

main();
