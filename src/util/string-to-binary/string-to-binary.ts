const stringToBinary = (value: string) =>
  value
    .replace(/[^01]/, "")
    .split("")
    .reverse()
    .map((v, i) => Number(v) << i)
    .reduce((acc, curr) => acc | curr, 0);

export { stringToBinary };
