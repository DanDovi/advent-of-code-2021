import { expect } from "chai";
import { Processor } from "../src/aoc-day7";
import { testInput } from "../src/input/input-day7";

describe("Day 6: Unit tests", () => {
  console.log("No unit tests for day 6");
});

describe("Day 6", () => {
  it("Part 1 test result equals 37", () => {
    expect(Processor.PartOne(testInput)).to.equal(37);
  });

  it("Part 2 test result equals 168", () => {
    expect(Processor.PartTwo(testInput)).to.equal(168);
  });
});
