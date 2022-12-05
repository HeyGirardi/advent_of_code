const utils = require('../utils');

const regexAlpha = /[A-Z]/;
const regexDigit = /\d/;
const regexInstruction = /move (\d+) from (\d+) to (\d+)/;

async function main() {
  try {
    const separator = '\n\n';
    console.log({
      day: 5,
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
  const input = await utils.readFile(dir, file, separator);
  const crateMap = input[0].split('\n').reverse().map(row => row.split(''));
  const relocations = input[1].split('\n').map(row => {
    const match = row.match(regexInstruction);
    return {
      quantity: +match[1],
      source: match[2],
      target: match[3]
    };
  });
  const crates = crateMap[0].reduce((acc, char, i) => {
    if (regexDigit.test(char)) {
      acc[char] = {
        position: char,
        crates: []
      };
      for (let x = 1; x < crateMap.length; x++) {
        const crate = crateMap[x][i];
        if (regexAlpha.test(crate)) {
          acc[char].crates.push(crate);
        } else {
          break;
        }
      }
    }
    return acc;
  }, {});
  return { crates, relocations };
}

async function puzzle1(dir, file, separator) {
  const { crates, relocations } = await data(dir, file, separator);
  relocations.forEach(move => {
    const fromCrate = crates[move.source].crates;
    const toCrate = crates[move.target].crates;
    const position = fromCrate.slice(0, -move.quantity);
    toCrate.push(...fromCrate.slice(-move.quantity).reverse());
    crates[move.source].crates = position;
  });
  let result = '';
  for (const crate in crates) {
    const stack = crates[crate];
    result += stack.crates.slice().reverse()[0];
  }
  return result;
}

async function puzzle2(dir, file, separator) {
  const { crates, relocations } = await data(dir, file, separator);
  relocations.forEach(move => {
    const fromCrate = crates[move.source].crates;
    const toCrate = crates[move.target].crates;
    const position = fromCrate.slice(0, -move.quantity);
    toCrate.push(...fromCrate.slice(-move.quantity));
    crates[move.source].crates = position;
  });
  let result = '';
  for (const crate in crates) {
    const stack = crates[crate];
    result += stack.crates.slice().reverse()[0];
  }
  return result;
}

main();
