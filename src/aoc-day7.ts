import { testInput, input } from "./input/input-day7";
import { IAdventOfCodeProcessor } from "./interfaces";

const parseInput = (input: string) => {
  return input.split(",").map((i) => parseInt(i, 10));
};


const calculateMinimumFuelUse = (input: number[], fuelCalc: (distance: number) => number): number => {
  const min = Math.min(...input);
  const max = Math.max(...input);

  let minFuelCost = Number.MAX_VALUE;

  for (let i = min; i <= max; i++) {
    const cost = input.reduce((agg, curr) => agg + fuelCalc(Math.abs(curr - i)), 0);

    if (cost < minFuelCost) minFuelCost = cost;
  }

  return minFuelCost
};

const calculateMinimumFuelUseLinear = (input: number[]) => calculateMinimumFuelUse(input, n => n);

const increaseFuelUseByDistance = (d: number): number => {
  let sum = 0

  for (let i = 0; i < d; i ++) {
    sum += d - i;
  }

  return sum;
};

const calculateMinimumFuelUseIncreasing = (input: number[]) => calculateMinimumFuelUse(input, increaseFuelUseByDistance);

console.log(calculateMinimumFuelUseIncreasing(parseInput(input)));

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input) => calculateMinimumFuelUseLinear(parseInput(input)),
  PartTwo: (input) => calculateMinimumFuelUseIncreasing(parseInput(input))
};