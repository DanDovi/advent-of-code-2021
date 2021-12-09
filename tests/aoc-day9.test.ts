import { expect } from "chai";
import { Processor } from "../src/aoc-day9";
import { testInput } from "../src/input/input-day9";

describe("Day 9: Unit tests", () => {
 // No Unit Tests for day 8.
});

describe("Day 9", () => {

  it("Part 1 test result equals 15", () => {
    expect(Processor.PartOne(testInput)).to.equal(15);
  });

  it("Part 2 test result equals 1134", () => {
    expect(Processor.PartTwo(testInput)).to.equal(1134);
  });
});
