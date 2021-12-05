import { expect } from "chai";
import { Processor } from "../src/aoc-day5";
import { testInput } from "../src/input/input-day5";

describe("Day 5", () => {

  it("Part 1 test result equals 5", () => {
    expect(Processor.PartOne(testInput)).to.equal(5);
  });

  it("Part 2 test result equals 12", () => {
    expect(Processor.PartTwo(testInput)).to.equal(12);
  });
});
