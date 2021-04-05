export default function average(answers: Record<number, number>): number {
  let sum = 0;
  let n = 0;
  Object.keys(answers).forEach((answer) => {
    sum += parseInt(answer) * answers[parseInt(answer)];
    n += answers[parseInt(answer)];
  });
  return sum / n;
}
