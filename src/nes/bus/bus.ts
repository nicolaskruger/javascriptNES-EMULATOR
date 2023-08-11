type Bus = {
  ram: number[];
};

const readBuz = (bus: Bus, index: number) => {
  if (index >= 0x000 && index <= 0xffff) {
    return bus.ram[index];
  }
  return 0x00;
};

const writeBus = (bus: Bus, index: number, value: number): Bus => {
  if (index >= 0x000 && index <= 0xffff) {
    return {
      ...bus,
      ram: bus.ram.map((v, i) => (i === index ? value : v)),
    };
  }
  return {
    ...bus,
  };
};

const initializeBus = (): Bus => ({
  ram: "_"
    .repeat(0x10000)
    .split("")
    .map((v) => 0),
});

export type { Bus };

export { initializeBus, readBuz, writeBus };
