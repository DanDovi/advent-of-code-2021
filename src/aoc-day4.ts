import { testInput, input } from "./input/input-day4";
import { IAdventOfCodeProcessor } from "./interfaces";

type BingoCardRow = [number, number, number, number, number];
type BingoCard = [
  BingoCardRow,
  BingoCardRow,
  BingoCardRow,
  BingoCardRow,
  BingoCardRow
];

type ResultCardRow = [boolean, boolean, boolean, boolean, boolean];
export type ResultCard = [
  ResultCardRow,
  ResultCardRow,
  ResultCardRow,
  ResultCardRow,
  ResultCardRow
];

interface IBingoData {
  calledNumbers: number[];
  cards: BingoCard[];
}

interface IBingoWinData {
  card: BingoCard;
  cardIndex: number;
  resultCard: ResultCard;
  winningNumber: number;
}

function chunkArray<Type>(array: Array<Type>, size: number): Type[][] {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
}

const getBingoData = (input: string): IBingoData => {
  const inputRows = input.split("\n").filter((row) => row !== "");
  const calledNumbers = inputRows[0]
    .split(",")
    .map((i) => parseInt(i.trim(), 10));
  const cards: BingoCard[] = chunkArray(inputRows.slice(1), 5).map(
    (a) =>
      a.map(
        (s) =>
          s
            .trim()
            .split(/\s+/)
            .map((i) => parseInt(i, 10)) as BingoCardRow
      ) as BingoCard
  );

  const bingoData = { calledNumbers, cards };
  return bingoData;
};

export const checkForWin = (card: ResultCard): boolean => {
  return (
    card.some((row) => row.every((v) => v)) ||
    card[0].some((_, i) => card.every((row) => row[i]))
  );
};

const getWinningCards = (data: IBingoData): IBingoWinData[] => {
  const { calledNumbers, cards } = data;

  const winnningData: Array<IBingoWinData> = [];

  const resultCards = cards.map(
    (card) => card.map((row) => row.map(() => false)) as ResultCard
  );

  for (let i = 0; i < calledNumbers.length; i++) {
    cards.forEach((card, ci) =>
      card.forEach((row, ri) =>
        row.forEach((v, vi) => {
          if (v === calledNumbers[i]) resultCards[ci][ri][vi] = true;
        })
      )
    );


    // Can't win if less than 5 numbers have been called
    if(i < 4) continue;

    const winningResultCards = resultCards
      .map((r, i) => ({ resultCard: r, index: i }))
      .filter((rc) => checkForWin(rc.resultCard));

    const newWinningResultCards = winningResultCards.filter(
      (rc) => !winnningData.some(wdc => wdc.cardIndex === rc.index)
    );
    newWinningResultCards.forEach((rc) =>
      winnningData.push({
        card: cards[rc.index].map(
          (v) => v.map((u) => u) as BingoCardRow
        ) as BingoCard,
        cardIndex: rc.index,
        resultCard: rc.resultCard.map(
          (v) => v.map((u) => u) as ResultCardRow
        ) as ResultCard,
        winningNumber: calledNumbers[i],
      })
    );

    if (winningResultCards.length === cards.length) break;
  }

  return winnningData;
};

const getFirstWinningCard = (data: IBingoWinData[]): IBingoWinData => {
  return data[0];
};

const getLastWinningCard = (data: IBingoWinData[]): IBingoWinData => {
  return data[data.length - 1];
};

const calculateCardScore = (cardData: IBingoWinData): number => {
  const { card, resultCard, winningNumber } = cardData;

  const sumUnmarked = card.reduce(
    (cardAgg, currentRow, i) =>
      cardAgg +
      currentRow.reduce(
        (rowAgg, val, j) => (!resultCard[i][j] ? rowAgg + val : rowAgg),
        0
      ),
    0
  );

  return sumUnmarked * winningNumber;
};

export const Processor: IAdventOfCodeProcessor = {
  PartOne: (input: string) => calculateCardScore(
          getFirstWinningCard(getWinningCards(getBingoData(input)))
        ),
  PartTwo: (input: string) => calculateCardScore(
    getLastWinningCard(getWinningCards(getBingoData(input)))
  )
};

// console.log(
//   "Part 1 testResult: " +
//     calculateCardScore(
//       getFirstWinningCard(getWinningCards(getBingoData(testInput)))
//     )
// );
// console.log(
//   "Part 1 Result: " +
//     calculateCardScore(
//       getFirstWinningCard(getWinningCards(getBingoData(input)))
//     )
// );

// console.log(
//   "Part 2 testResult: " +
//     calculateCardScore(
//       getLastWinningCard(getWinningCards(getBingoData(testInput)))
//     )
// );

// console.log(
//   "Part 2 Result: " +
//     calculateCardScore(
//       getLastWinningCard(getWinningCards(getBingoData(input)))
//     )
// );
