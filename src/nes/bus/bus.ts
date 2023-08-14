import { mask8bit } from "../../util/calculator/mask";

type Bus = {
  ram: number[];
};

const readBuz = (bus: Bus, index: number) => {
  if (index >= 0x000 && index <= 0xffff) {
    return mask8bit(bus.ram[index]);
  }
  return 0x00;
};

const writeBus = (bus: Bus, index: number, value: number): Bus => {
  if (index >= 0x000 && index <= 0xffff) {
    return {
      ...bus,
      ram: bus.ram.map((v, i) => (i === index ? mask8bit(value) : v)),
    };
  }
  return {
    ...bus,
  };
};

const read2BytesFromBuss = (bus: Bus, index: number): number => {
  const lo = readBuz(bus, index);
  const hi = readBuz(bus, index + 1);

  return (hi << 8) | lo;
};

const initializeBus = (): Bus => ({
  ram: "_"
    .repeat(0x10000)
    .split("")
    .map((v) => 0),
});

export type { Bus };

export { initializeBus, readBuz, writeBus, read2BytesFromBuss };
