import { testInput, input } from "./input/input-day3";
import { IAdventOfCodeProcessor } from "./interfaces";

const intFromBinaryArray = (arr: number[]) => parseInt(arr.join(""), 2);

const mostCommonBitsInPositions = (arr: number[][]) => {
  const wordLength = arr[0].length;
  return arr
    .reduce(
      (agg, curr) => agg.map((v, i) => v + curr[i]),
      new Array(wordLength).fill(0)
    )
    .map((v) => (v >= arr.length / 2 ? 1 : 0));
};

const flipBitArray = (arr: number[]) => arr.map((v) => (v === 1 ? 0 : 1));

export const parseInput = (input: string): number[][] => {
  const words = input.split("\n");
  const splitWords = words.map((s) => s.split("").map((d) => parseInt(d, 10)));
  return splitWords;
}

const calculatePowerRating = (splitWords: number[][]): number => {
  const mostCommonBits = mostCommonBitsInPositions(splitWords);
  const leastCommonBits = flipBitArray(mostCommonBits);

  const gammaRateBinary = [...mostCommonBits];
  const epsilonRateBinary = [...leastCommonBits];

  const gammaRateDecimal = intFromBinaryArray(gammaRateBinary);
  const epsilonRateDecimal = intFromBinaryArray(epsilonRateBinary);

  const powerConsumption = gammaRateDecimal * epsilonRateDecimal;

  return powerConsumption;
}

export const calculateOxygenRating = (splitWords: number[][]): number => {
  const wordLength = splitWords[0].length;
  let potentialOxygenRatings = [...splitWords];

  for (let i = 0; i < wordLength; i++) {
    const bits = mostCommonBitsInPositions(potentialOxygenRatings);
    potentialOxygenRatings = potentialOxygenRatings.filter(
      (o) => o[i] === bits[i]
    );
    if (potentialOxygenRatings.length === 1) break;
  }

  return intFromBinaryArray(potentialOxygenRatings[0]);
}

export const calculateCo2Rating = (splitWords: number[][]): number => {
  const wordLength = splitWords[0].length;
  let potentialCo2Ratings = [...splitWords];

  for (let i = 0; i < wordLength; i++) {
    const bits = flipBitArray(mostCommonBitsInPositions(potentialCo2Ratings));
    potentialCo2Ratings = potentialCo2Ratings.filter((o) => o[i] === bits[i]);
    if (potentialCo2Ratings.length === 1) break;
  }

  return intFromBinaryArray(potentialCo2Ratings[0]);
}

const calculateLifeSupportRating = (splitWords: number[][]): number => {
  const oxygenRating = calculateOxygenRating(splitWords);
  const co2Rating = calculateCo2Rating(splitWords);

  const lifeSupportRating = co2Rating * oxygenRating;

  return lifeSupportRating;
}

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input) => calculatePowerRating(parseInput(input)),
  PartTwo: (input) => calculateLifeSupportRating(parseInput(input)),
}
