import { testInput, input } from "./input/input-day6";
import { IAdventOfCodeProcessor } from "./interfaces";

type FishState = number[];
const MAX_TIME_TO_NEW_FISH = 8;
const NORMAL_TIME_TO_NEW_FISH = 6;

export const parseInput = (input: string): FishState => {
  const splitInput = input.split(",")
  .map(n => parseInt(n, 10));

  return Array.from({length: MAX_TIME_TO_NEW_FISH + 1}, (_, i) => splitInput.filter(v => v === i).length)
};

const tickFishArr = (state: FishState): FishState => {
  const newState = Array.from({length: MAX_TIME_TO_NEW_FISH + 1}, () => 0);

  for (let i = MAX_TIME_TO_NEW_FISH; i > 0; i--) {
    newState[i -1] = state[i];
  }

  newState[MAX_TIME_TO_NEW_FISH] = state[0];
  newState[NORMAL_TIME_TO_NEW_FISH] = newState[NORMAL_TIME_TO_NEW_FISH] + state[0];

  return newState;
}

export const getFishCountAfterDays = (
  initialState: FishState,
  days: number
): number => {
  // Recent versions of node do not support tail call optimization, so this needs to be iterative.
  let fishArr = initialState;

  for (let i = 0; i < days; i++) {
    fishArr = tickFishArr(fishArr);
  }

  return fishArr.reduce((agg, curr) => agg + curr, 0);
};

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input) => getFishCountAfterDays(parseInput(input), 80),
  PartTwo: (input) => getFishCountAfterDays(parseInput(input), 256),
};
