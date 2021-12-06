import { expect } from "chai";
import { getFishCountAfterDays, Processor, parseInput } from "../src/aoc-day6";
import { testInput } from "../src/input/input-day6";

describe("Day 6: Unit tests", () => {

  it("GetFishCountAfterDays should return 26 for (testInput, 18)", () => {
    expect(getFishCountAfterDays(parseInput(testInput), 18)).to.equal(26);
  });


});

describe("Day 6", () => {

  it("Part 1 test result equals 5934", () => {
    expect(Processor.PartOne(testInput)).to.equal(5934);
  });

  it("Part 2 test result equals 26984457539", () => {
    expect(Processor.PartTwo(testInput)).to.equal(26984457539);
  });
});
