type Bus = {
  ram: number[];
};

const readBuz = (buz: Bus, index: number) => 1;

const writeBus = (buz: Bus, index: number, value: number): Bus => buz;

const initializeBus = (): Bus => ({
  ram: "_"
    .repeat(0x10000)
    .split("")
    .map((v) => 0),
});

export type { Bus };

export { initializeBus, readBuz, writeBus };
