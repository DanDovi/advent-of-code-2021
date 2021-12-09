import { expect } from "chai";
import { Processor } from "../src/aoc-day8";
import { testInput } from "../src/input/input-day8";

describe("Day 8: Unit tests", () => {
 // No Unit Tests for day 8.
});

describe("Day 8", () => {

  it("Part 1 test result equals 26", () => {
    expect(Processor.PartOne(testInput)).to.equal(26);
  });

  it("Part 2 test result equals 61229", () => {
    expect(Processor.PartTwo(testInput)).to.equal(61229);
  });
});
