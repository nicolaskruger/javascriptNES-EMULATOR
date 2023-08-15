const deepClone = <T extends unknown>(value: T): T =>
  JSON.parse(JSON.stringify(value));

export { deepClone };
