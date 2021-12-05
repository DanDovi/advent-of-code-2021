import { testInput, input } from "./input/input-day5";
import { IAdventOfCodeProcessor } from "./interfaces";

interface ICoordinate {
  x: number;
  y: number;
}

interface IVentSegment {
  start: ICoordinate;
  end: ICoordinate;
}

interface IGridRange {
  maxX: number;
  maxY: number;
}

type VentCountGrid = number[][];

const parseInput = (input: string): IVentSegment[] => {
  return input.split("\n").map((line) => {
    const coordinateRegex = /^([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)$/;
    const coordinateArr = line.match(coordinateRegex);
    if (!coordinateArr || coordinateArr?.length < 5)
      throw new Error(
        "input parse error: incorrect number of coordinates read."
      );
    const [x1, y1, x2, y2] = coordinateArr.slice(1).map((v) => parseInt(v, 10));
    return { start: { x: x1, y: y1 }, end: { x: x2, y: y2 } };
  });
};

// Assumes min x and y are 0
const getGridRange = (segments: IVentSegment[]): IGridRange => {
  const gridRange: IGridRange = {
    maxX: Number.MIN_VALUE,
    maxY: Number.MIN_VALUE,
  };

  segments.forEach((seg) => {
    const { start, end } = seg;

    // This could be optimized slightly if we ensured all segments went from left to right
    if (start.x > gridRange.maxX) gridRange.maxX = start.x;
    if (end.x > gridRange.maxX) gridRange.maxX = end.x;

    if (start.y > gridRange.maxY) gridRange.maxY = start.y;
    if (end.y > gridRange.maxY) gridRange.maxY = end.y;
  });

  gridRange.maxX += 1;
  gridRange.maxY += 1;

  return gridRange;
};

const createGrid = (gridRange: IGridRange): VentCountGrid => {
  return Array.from(Array(gridRange.maxY)).map(() =>
    Array.from(Array(gridRange.maxX)).fill(0)
  );
};

// Assume integer relationships. Fine for part 1.
const getGridPointsForSegment = (
  segment: IVentSegment,
  ignoreDiagonals = false
): ICoordinate[] => {
  // Order by x to ensure left to right operation
  const start = segment.start.x < segment.end.x ? segment.start : segment.end;
  const end = segment.start.x < segment.end.x ? segment.end : segment.start;

  const dx = end.x - start.x;
  const dy = end.y - start.y;

  //diagonal lines will never have a gradient other than 1 or -1;
  if (dx && dy) {
    if(ignoreDiagonals) return [];
    return Array.from({ length: dx + 1 }, (_, i) => ({
      x: start.x + i,
      y: start.y + (dy / Math.abs(dy)) * i,
    }));
  }
  if (dx === 0) {
    return Array.from({ length: Math.abs(dy) + 1 }, (_, i) => ({
      x: start.x,
      y: start.y < end.y ? start.y + i : end.y + i,
    }));
  }
  return Array.from({ length: dx + 1 }, (_, i) => ({
    x: start.x + i,
    y: start.y,
  }));
};

const countVentOverlaps = (
  segments: IVentSegment[],
  ignoreDiagonals = false
) => {
  const grid = createGrid(getGridRange(segments));

  segments.forEach((seg) => {
    const points = getGridPointsForSegment(seg, ignoreDiagonals);
    points.forEach((p) => {
      const pointTotal = grid[p.y][p.x] + 1;
      grid[p.y][p.x] = pointTotal;
    });
  });

  const overlaps = grid.reduce(
    (agg, row) =>
      agg + row.reduce((rowAgg, v) => (v > 1 ? rowAgg + 1 : rowAgg), 0),
    0
  );
  return overlaps;
};

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input: string) => countVentOverlaps(parseInput(input), true),
  PartTwo: (input: string) => countVentOverlaps(parseInput(input)),
};

// console.log(`Part 1:
// testInput vent overlaps: ${countVentOverlaps(parseInput(testInput), true)}
// input vent overlaps: ${countVentOverlaps(parseInput(input), true)}`);

// console.log(`Part 2:
// testInput vent overlaps with diagonals: ${countVentOverlaps(
//   parseInput(testInput)
// )}
// input vent overlaps with diagonals: ${countVentOverlaps(parseInput(input))}`);
