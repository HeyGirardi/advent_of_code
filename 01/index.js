const utils = require('../utils');

async function main() {
  try {
    console.log({
      day: 1,
      puzzles: [
        {
          id: 1,
          sample: await puzzle1(__dirname, 'sample'),
          answer: await puzzle1(__dirname, 'input'),
        },
        {
          id: 2,
          sample: await puzzle2(__dirname, 'sample'),
          answer: await puzzle2(__dirname, 'input'),
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
}

async function puzzle1(dir, file) {
  const data = await utils.readFile(dir, file);
  let highest = 0;
  let inventory = [];
  for (let i = 0; i < data.length; i++) {
    if (+data[i] > 0) {
      inventory.push(+data[i]);
    } else {
      const calories = inventory.reduce((a, b) => a + b);
      if (calories > highest) highest = calories;
      inventory = [];
    }
  }
  return highest;
}

async function puzzle2(dir, file) {
  const data = await utils.readFile(dir, file);
  const elves = [];
  let inventory = [];
  for (let i = 0; i < data.length; i++) {
    if (+data[i] > 0) {
      inventory.push(+data[i]);
    } else {
      const calories = inventory.reduce((a, b) => a + b);
      elves.push(calories);
      inventory = [];
    }
  }
  return elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
}

main();
