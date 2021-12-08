import { expect } from "chai";
import { Processor, checkForWin, ResultCard } from "../src/aoc-day4";
import { testInput } from "../src/input/input-day4";

describe("Day 4: Unit tests", () => {
  const cardTestRow: ResultCard = [
    [false, false, false, false, false],
    [true, true, true, true, true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];

  const cardTestCol: ResultCard = [
    [false, true, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
  ];

  const cardTestLose: ResultCard = [
    [false, false, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
  ];

  it("CheckForWin on cardTestRow should return true", () => {
    expect(checkForWin(cardTestRow)).to.be.true;
  });

  it("CheckForWin on cardTestCol should return true", () => {
    expect(checkForWin(cardTestCol)).to.be.true;
  });

  it("CheckForWin on cardTestLose should return false", () => {
    expect(checkForWin(cardTestLose)).to.be.false;
  });
});

describe("Day 4", () => {
  it("Part 1 test result Equals 4512", () => {
    expect(Processor.PartOne(testInput)).to.equal(4512);
  });

  it("Part 2 test result Equals 1924", () => {
    expect(Processor.PartTwo(testInput)).to.equal(1924);
  });
});
