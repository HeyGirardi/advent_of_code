const utils = require('../utils');

async function main() {
  try {
    const separator = '\n';
    console.log({
      day: 3,
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

async function puzzle1(dir, file, separator) {
  const rucksacks = (await utils.readFile(dir, file, separator)).map(pocket => {
    const half = Math.floor(pocket.length / 2);
    const items = {
      left: pocket.substr(0, half),
      right: pocket.substr(half)
    };
    const common = [];
    for (const i of items.left) {
      if (items.right.includes(i)) {
        common.push(i);
        break;
      }
    }
    return common;
  }).flat();
  const scores = {};
  for (let char = 1; char <= 26; char++) {
    scores[String.fromCharCode(char + 96)] = char;
    scores[String.fromCharCode(char + 64)] = char + 26;
  }
  return rucksacks.reduce((sum, item) => sum + scores[item], 0);
}

async function puzzle2(dir, file, separator) {
  const groups = await utils.readFile(dir, file, separator);
  const rucksacks = [];
  for (let i = 0; i < groups.length; i += 3) {
    rucksacks.push(groups.slice(i, i + 3));
  }
  const badges = rucksacks.reduce((comm, group) => {
    const same = [];
    for (const i of group[0]) {
      if (group[1].includes(i)) {
        same.push(i);
      }
    }
    for (const i of same) {
      if (group[2].includes(i)) {
        comm.push(i);
        break;
      }
    }
    return comm;
  }, []);
  const scores = {};
  for (let char = 1; char <= 26; char++) {
    scores[String.fromCharCode(char + 96)] = char;
    scores[String.fromCharCode(char + 64)] = char + 26;
  }
  return badges.reduce((sum, item) => sum + scores[item], 0);
}

main();
