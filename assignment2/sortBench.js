
const _ = require('lodash');
const moment = require('moment');

const insertSort = (unsortedData, comparator) => {

  for (let i = 1; i < unsortedData.length; i++) {
    let current = unsortedData[i];
    let j;

    for(j = i - 1 ; j >= 0 && comparator(current, unsortedData[j]) < 0 ; j--) {
      unsortedData[j + 1] = unsortedData[j];
    }

    unsortedData[j + 1] = current;
  }

  return unsortedData;
}

const bench = sortingFunction => {
  const startTime = Date.now();

  const a = _.times(10000, () => [_.random(100, 10000), _.random(100, 10000)])

  const comparator = (a, b) => a[0] / b[0] - Math.log(b[1]) / Math.log(a[1]);

  const result = sortingFunction([...a], comparator);
  console.log(result);
  result[_.random(0, 10000) % a.length] = 2; // Ensure the optimiser does not optimise out the sorting function

  const endTime = Date.now();

  const duration = endTime - startTime;
  return moment.duration(duration).asMilliseconds()
}

console.log('benchmarking sorting functions, hold on...');
console.log('build-in sort', bench((a, comparator) => a.sort(comparator)), 'ms');
console.log('in-place insert sort', bench(insertSort), 'ms');
console.log('done');
