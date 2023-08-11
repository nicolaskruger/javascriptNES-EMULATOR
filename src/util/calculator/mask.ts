const mask = (value: number, offset: number) => {
  return value & ~(-1 << offset);
};

const mask8bit = (value: number) => mask(value, 8);

const mask16bit = (value: number) => mask(value, 16);

export { mask, mask8bit, mask16bit };
