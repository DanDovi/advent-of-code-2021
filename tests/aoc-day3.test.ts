import { expect } from "chai";
import { Processor, parseInput, calculateOxygenRating,  calculateCo2Rating} from "../src/aoc-day3";
import { testInput } from "../src/input/input-day3";

describe("Day 3: Unit tests", () => {

  it("CalculateOxygenRating on testInput should return 23", () => {
    expect(calculateOxygenRating(parseInput(testInput))).to.equal(23);
  });

  it("CalculateCo2Rating on testInput should return 10", () => {
    expect(calculateCo2Rating(parseInput(testInput))).to.equal(10);
  });

});

describe("Day 3", () => {
  it("Part 1 test result Equals 198", () => {
    expect(Processor.PartOne(testInput)).to.equal(198);
  });

  it("Part 2 test result Equals 230", () => {
    expect(Processor.PartTwo(testInput)).to.equal(230);
  });
});
