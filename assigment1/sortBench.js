
const moment = require('moment');

const merge = (left, right) => {
  let arr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return arr.concat(left.slice().concat(right.slice()));
}

const mergeSort = arr => {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

const insertSort = unsortedData => {

  for (let i = 1; i < unsortedData.length; i++) {
    let current = unsortedData[i];
    let j;

    for(j = i - 1 ; j >= 0 && unsortedData[j] > current ; j--) {
      unsortedData[j + 1] = unsortedData[j];
    }

    unsortedData[j + 1] = current;
  }

  return unsortedData;
}

const bench = sortingFunction => {
  const num_iterations = 1000000;
  const startTime = Date.now();

  const a = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

  for(let i = 0 ; i != num_iterations ; i++) {
    const result = sortingFunction([...a]);
    result[i % a.length] = 2; // Ensure the optimiser does not optimise out the sorting function
  }

  const endTime = Date.now();

  const timeFor10BCalls = ((endTime - startTime) / num_iterations) * 10000000000;
  return moment.duration(timeFor10BCalls).humanize()
}

console.log('benchmarking sorting functions, hold on...');
console.log('build-in sort', bench(a => a.sort()), 'per 10 Billion calls');
console.log('merge sort', bench(mergeSort), 'per 10 Billion calls');
console.log('in-place insert sort', bench(insertSort), 'per 10 Billion calls');
console.log('done');
