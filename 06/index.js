const utils = require('../utils');

async function main() {
  try {
    const separator = '';
    console.log({
      day: 6,
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
  return {
    buffer: await utils.readFile(dir, file, separator),
    marker: [],
    index: 0,
  };
}

async function puzzle1(dir, file, separator) {
  let { buffer, marker, index } = await data(dir, file, separator);
  for (let i = 4; i < buffer.length; i++) {
    const slice = buffer.slice(i - 4, i);
    const unique = [...new Set(slice)];
    if (unique.length === 4) {
      marker = unique;
      index = i;
      break;
    }
  }
  return index;
}

async function puzzle2(dir, file, separator) {
  let { buffer, marker, index } = await data(dir, file, separator);
  const len = 14;
  for (let i = len; i < buffer.length; i++) {
    const slice = buffer.slice(i - len, i);
    const unique = [...new Set(slice)];
    if (unique.length === len) {
      marker = unique;
      index = i;
      break;
    }
  }
  return index;
}

main();
