const dataset = require("./my-app/src/cities.json");
const fs = require("fs");

function reduceWithoutSpread(predicate) {
  return this.reduce((curr, next) => {
    const groupKey = predicate(next);
    const groupValue = curr[groupKey] ?? [];

    groupValue.push(next);

    curr[groupKey] = groupValue;

    return curr;
  }, {});
}

function reduceWithSpread(predicate) {
  return this.reduce((curr, next) => {
    const groupKey = predicate(next);

    return { ...curr, [groupKey]: [...(curr[groupKey] ?? []), next] };
  }, {});
}

function justLoop(predicate) {
  const group = {};

  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    const groupKey = predicate(element);
    const groupValue = group[groupKey] ?? [];

    groupValue.push(element);

    group[groupKey] = groupValue;
  }

  return group;
}

console.log(dataset.length);

function runner(implementation) {
  Array.prototype.group = implementation;
  const startTime = performance.now();
  dataset.group(({ country }) => country);
  const endTime = performance.now();

  const timeElapsed = Number(endTime - startTime).toFixed(2);
  console.log(timeElapsed);
  return timeElapsed;
}

const filesAndImplementations = [
  ["results/reduce_with_spread.csv", reduceWithSpread],
  ["results/just_loop.csv", justLoop],
  ["results/reduce_without_spread.csv", reduceWithoutSpread],
];

filesAndImplementations.forEach(([file, implementation]) => {
  for (let i = 0; i < 100; i++) {
    const timeElapsed = runner(implementation);

    fs.appendFile(file, `${timeElapsed}\n`, (err) => {
      if (err) console.error(err);
    });
  }
});
