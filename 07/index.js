const utils = require('../utils');

const regexCDPath = /^\$ cd (.*)/;
const regexFileSize = /^\d+/;

async function main() {
  try {
    const separator = '\n';
    console.log({
      day: 7,
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
  const commands = await utils.readFile(dir, file, separator), dirs = [], path = [];
  for (const command of commands) {
    let vdir = null;
    let size = null;
    if ((vdir = command.match(regexCDPath))) {
      const name = vdir[1];
      name === '..' ? path.pop() : path.push(name);
    } else if ((size = command.match(regexFileSize))) {
      for (let i = 0; i < path.length; i++) {
        const name = path.slice(0, i + 1).join();
        dirs[name] = (dirs[name] || 0) + +size[0];
      }
    }
  }
  return { dirs, sizes: Object.values(dirs) };
}

async function puzzle1(dir, file, separator) {
  return (await data(dir, file, separator)).sizes.reduce((sum, size) => (size <= 100000 ? sum + size : sum), 0);
}

async function puzzle2(dir, file, separator) {
  const { dirs, sizes } = await data(dir, file, separator);
  const required = 30000000 - (70000000 - dirs['/']);
  return sizes.reduce((smallest, size) => {
    return size >= required && size < smallest ? size : smallest;
  }, Infinity);
}

main();
