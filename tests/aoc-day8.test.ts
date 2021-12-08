import { expect } from "chai";
import { Processor } from "../src/aoc-day8";
import { testInput } from "../src/input/input-day8";

describe("Day 6: Unit tests", () => {

  // it("GetFishCountAfterDays should return 26 for (testInput, 18)", () => {
  //   expect(getFishCountAfterDays(parseInput(testInput), 18)).to.equal(26);
  // });


});

describe("Day 6", () => {

  it("Part 1 test result equals 26", () => {
    expect(Processor.PartOne(testInput)).to.equal(26);
  });

  it("Part 2 test result equals 61229", () => {
    expect(Processor.PartTwo(testInput)).to.equal(61229);
  });
});
