import { input, testInput } from "./input/input-day9";
import { IAdventOfCodeProcessor } from "./interfaces";

const parseInput = (input: string) => {
  return input.split("\n").map((r) => r.split("").map((c) => parseInt(c, 10)));
};

function getSurroundingPoints<Type>(
  arr: Type[][],
  i: number,
  j: number
): (Type | null)[] {
  const surroundingPoints: (Type | null)[] = [null, null, null, null];

  if (j > 0) {
    surroundingPoints[0] = arr[i][j - 1];
  }
  if (i > 0) {
    surroundingPoints[1] = arr[i - 1][j];
  }
  if (j < arr[i].length - 1) {
    surroundingPoints[2] = arr[i][j + 1];
  }
  if (i < arr.length - 1) {
    surroundingPoints[3] = arr[i + 1][j];
  }

  return surroundingPoints;
}

const getLowPoints = (input: number[][]): number[] => {
  const lowPoints = input.map((row, i, arr) =>
    row.filter((val, j) => {
      const surroundingPoints = getSurroundingPoints(arr, i, j);

      return surroundingPoints.every((v) => v === null || v > val);
    })
  );

  return lowPoints.reduce((agg, row) => [...agg, ...row]);
};

const getRiskLevels = (lowPoints: number[]) => lowPoints.map((n) => n + 1);

const sumRiskLevels = (riskLevels: number[]) =>
  riskLevels.reduce((agg, curr) => agg + curr, 0);

const floodFill = (
  arr: (number | string)[][],
  i: number,
  j: number,
  id: string
) => {
  // already filled
  if (typeof arr[i][j] === "string") return;

  // not basin
  if (arr[i][j] === 9) return;

  arr[i][j] = id;
  const surroundingCoordinates = [
    [i, j - 1],
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
  ].filter(
    (c) => c[0] >= 0 && c[0] < arr.length && c[1] >= 0 && c[1] < arr[i].length
  );

  surroundingCoordinates.forEach((c) => floodFill(arr, c[0], c[1], id));
};

// A basin will be represented by a grid of the same dimensions
// as the input, where any non 0 value indicates the tile is in a basin.
const getBasins = (input: number[][]): string[][] => {
  const basinGrid: (number | string)[][] = input.map((row) =>
    row.map((v) => v)
  );

  const basinIds: string[] = [];

  input.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val !== 9 && typeof val === "number") {
        const surroundingPoints = getSurroundingPoints(basinGrid, i, j);

        // already in basin, change to be the same;
        if (surroundingPoints.some((p) => typeof p === "string")) {
          basinGrid[i][j] = surroundingPoints.find(
            (p) => typeof p === "string"
          ) as string;
        }
        // create new basin
        else {
          let newId: string;

          do {
            newId = "id" + Math.random().toString().slice(2, 6);
            if (basinIds.findIndex((v) => v === newId) < 0) {
              basinIds.push(newId);
            }
          } while (!basinIds.find((v) => v === newId));

          floodFill(basinGrid, i, j, newId);
        }
      }
    })
  );

  return basinGrid.map((row) => row.map((v) => (v === 9 ? "" : (v as string))));
};

const sumLargestBasins = (input: number[][], basinGrid: string[][]) => {
  const basinIds = basinGrid.reduce(
    (agg, row) => [
      ...agg,
      ...row.reduce(
        (rowAgg, v) =>
          v.length === 0 || agg.includes(v) || rowAgg.includes(v)
            ? rowAgg
            : [...rowAgg, v],
        [] as string[]
      ),
    ],
    []
  );

  const basinCount = Array.from({ length: basinIds.length }, () => 0);

  basinGrid.forEach((row) =>
    row.forEach((val) => {
      if (val.length > 0) basinCount[basinIds.indexOf(val)]++;
    })
  );

  const biggestIndicies: number[] = [];

  for (let i = 0; i < 3; i++) {
    const maxCount = Math.max(...basinCount);
    biggestIndicies.push(basinCount.indexOf(maxCount));
    basinCount[basinCount.indexOf(maxCount)] = 0;
  }

  const biggestIds = basinIds.filter((_, i) => biggestIndicies.includes(i));

  const basinSums = biggestIds.map((id) =>
    input.map((row, i) => row.filter((_, j) => basinGrid[i][j] === id))
    .reduce((agg, row) => agg + row.length, 0)
  );

  return basinSums;
};

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input) =>
    sumRiskLevels(getRiskLevels(getLowPoints(parseInput(input)))),
  PartTwo: (input) =>
    sumLargestBasins(parseInput(input), getBasins(parseInput(input))).reduce(
      (agg, curr) => agg * curr,
      1
    ),
};
