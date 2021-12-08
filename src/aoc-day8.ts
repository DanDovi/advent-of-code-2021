import { input, testInput } from "./input/input-day8";
import { IAdventOfCodeProcessor } from "./interfaces";

interface IScrambledDisplaySignals {
  input: string[];
  output: string[];
}

type CodeMap = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const segmentCounts = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 5,
  7: 3,
  8: 7,
  9: 6,
};

const uniqueNumbersOfSegments = [2, 3, 4, 7];

const parseInput = (input: string): IScrambledDisplaySignals[] => {
  return input.split("\n").map((row) => {
    const [i, o] = row.split("|").map((s) =>
      s
        .trim()
        .split(" ")
        .map((s) => s.trim())
    );
    return { input: i, output: o };
  });
};

const countOutputDigitsWithUniqueSegCount = (
  scrambledSignals: IScrambledDisplaySignals[]
): number => {
  return scrambledSignals.reduce(
    (agg, curr) =>
      agg +
      curr.output.filter((s) => uniqueNumbersOfSegments.includes(s.length))
        .length,
    0
  );
};

console.log(countOutputDigitsWithUniqueSegCount(parseInput(input)));

// Process of elimitation for associating codes with numbers:
// 0, 1, 2, 3, 4, 5, 6 ,7 ,8 ,9
// 1, 7, 4 and 8 all have unique codes
// 0, 2, 3, 5, 6, 9
// 9 and 0 have both elements of 1 - gives us 6
// 0, 2, 3, 5, 9
// 3 will have one element different to 2 and 5, which will have 2 differences between them
// 0, 2, 5 ,9
// 9 has all parts of 3, 0 is left
// 2, 5
// all of 5 are in 6
// 2

const determineNumberCodes = (input: string[]): CodeMap => {
  const map: CodeMap = ["", "", "", "", "", "", "", "", "", ""];

  const remainingCodes = [...input];
  map[1] = remainingCodes.find((v) => v.length === 2) as string;
  remainingCodes.splice(remainingCodes.indexOf(map[1] as string), 1);

  map[7] = remainingCodes.find((v) => v.length === 3) as string;
  remainingCodes.splice(remainingCodes.indexOf(map[7] as string), 1);

  map[4] = remainingCodes.find((v) => v.length === 4) as string;
  remainingCodes.splice(remainingCodes.indexOf(map[4] as string), 1);

  map[8] = remainingCodes.find((v) => v.length === 7) as string;
  remainingCodes.splice(remainingCodes.indexOf(map[8] as string), 1);

  // 2, 3, 5
  const remainingCodesLengthFive = remainingCodes.filter((c) => c.length === 5);
  // 6, 0, 9
  const remainingCodesLengthSix = remainingCodes.filter((c) => c.length === 6);

  map[6] = remainingCodesLengthSix.filter((c) =>
    !map[1].split("").every((v) => c.includes(v))
  )[0];
  // 0,9
  remainingCodesLengthSix.splice(
    remainingCodesLengthSix.indexOf(map[6] as string),
    1
  );

  map[3] = remainingCodesLengthFive.filter((c, i, arr) =>
    arr
      .filter((_, j) => i !== j)
      .every(
        (oc) =>
          c
            .split("")
            .reduce((agg, v) => (oc.includes(v) ? agg + 1 : agg), 0) === 4
      )
  )[0];

  // 2, 5
  remainingCodesLengthFive.splice(
    remainingCodesLengthFive.indexOf(map[3] as string),
    1
  );

  map[9] = remainingCodesLengthSix.filter((c) =>
  map[3].split("").every((v) => c.includes(v))
  )[0];
  remainingCodesLengthSix.splice(
    remainingCodesLengthSix.indexOf(map[9] as string),
    1
  );

  map[0] = remainingCodesLengthSix[0];

  map[5] = remainingCodesLengthFive.filter((c) =>
    c.split("").every((char) => map[6].includes(char))
  )[0];
  remainingCodesLengthFive.splice(
    remainingCodesLengthFive.indexOf(map[5] as string),
    1
  );

  map[2] = remainingCodesLengthFive[0];

  if (!map.every((v: string) => v.length)) {
    throw new Error("Some character values were not determined.");
  }

  return map.map(code => code.split('').sort().join('')) as CodeMap;
};

const parseRow = (row: IScrambledDisplaySignals): number => {
  const map = determineNumberCodes(row.input);
  const intArr = row.output.map(c => map.indexOf(c.split('').sort().join('')));
  return parseInt(intArr.join(''), 10);
}

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input) => countOutputDigitsWithUniqueSegCount(parseInput(input)),
  PartTwo: (input) => parseInput(input).reduce((agg, row) => agg + parseRow(row), 0 ),
};
