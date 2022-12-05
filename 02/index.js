const utils = require('../utils');

async function main() {
  try {
    const separator = '\n';
    console.log({
      day: 2,
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
  return (await utils.readFile(dir, file, separator)).map((round) =>
    round
      .replaceAll('A', 1)
      .replaceAll('B', 2)
      .replaceAll('C', 3)
      .replaceAll('X', 1)
      .replaceAll('Y', 2)
      .replaceAll('Z', 3)
      .split(' ')
      .map((points) => +points)
  );
}

async function puzzle1(dir, file, separator) {
  return (await data(dir, file, separator)).reduce((a, b) => {
    if (b[0] === b[1]) return a + b[1] + 3;
    if (b[0] - b[1] === 1 || b[0] - b[1] === -2) return a + b[1];
    return a + b[1] + 6;
  }, 0);
}

async function puzzle2(dir, file, separator) {
  const loss = { 1: 3, 2: 1, 3: 2 };
  const win = { 1: 2, 2: 3, 3: 1 };
  return (await data(dir, file, separator)).reduce((a, b) => {
    if (b[1] === 2) return a + b[0] + 3;
    if (b[1] === 1) return a + loss[b[0]];
    return a + win[b[0]] + 6;
  }, 0);
}

main();
