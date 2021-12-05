import { input, testInput } from './input/input-day2';

const calculatePosition = (input: string) => {
  const commands = input.split('\n').map(s => {
    const res = s.split(" ");
    return { command: res[0], distance: parseInt(res[1]) };
  })

  const finalPos = commands.reduce((agg, curr) => {
    const { horPos, depthPos, aim } = agg;
    const { command, distance } = curr;
    switch (command) {
      case "down":
        return { horPos, depthPos, aim: aim + distance };
      case "up":
        return { horPos, depthPos, aim: aim - distance };
      case "forward":
        return { horPos: horPos + distance, depthPos: depthPos + (aim * distance), aim };
      default:
        return agg;
    }
  }, { horPos: 0, depthPos: 0, aim: 0 });

  return finalPos.horPos * finalPos.depthPos;
}

const partTwoTestRes = calculatePosition(testInput);
const partTwoRes = calculatePosition(input);

console.log(`Part 2: angled position test result: ${partTwoTestRes}\nangled position main result: ${partTwoRes}`);