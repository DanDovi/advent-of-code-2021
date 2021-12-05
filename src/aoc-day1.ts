import {input, testInput} from './input/input-day1'

const increaseTotal = (input: string) => {
  const inputArr = input.split('\n').map(s => parseInt(s, 10));

  const res = inputArr.reduce((agg, _, i, arr) => {
    if (i === 0) return agg;

    return arr[i] - arr[i - 1] > 0 ? agg + 1 : agg;
  }, 0);

  return res;
}

const slidingWindowIncreaseTotal = (input: string) => {
  const inputArr = input.split('\n').map(s => parseInt(s, 10));

  const res = inputArr.reduce((agg, _, i, arr) => {
    if (i > arr.length - 3) return agg;

    const first = arr[i] + arr[i+ 1] + arr[i + 2];
    const second = arr[i+ 1] + arr[i+ 2] + arr[i + 3];

    return second > first ? agg + 1 : agg;

  }, 0);

  return res;
}

const partOneTestRes = increaseTotal(testInput);
const partOneRes = increaseTotal(input);

console.log(`Part 1: slidingWindowSum test result: ${partOneTestRes}\nslidingWindowSum main result: ${partOneRes}`);

const partTwoTestRes = slidingWindowIncreaseTotal(testInput);
const partTwoRes = slidingWindowIncreaseTotal(input);

console.log(`Part 2: slidingWindowSum test result: ${partTwoTestRes}\nslidingWindowSum main result: ${partTwoRes}`);