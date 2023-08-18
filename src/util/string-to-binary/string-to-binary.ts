const stringToBinary = (value: string) =>
  value
    .split("")
    .reverse()
    .map((v, i) => Number(v) << i)
    .reduce((acc, curr) => acc | curr, 0);

export { stringToBinary };
