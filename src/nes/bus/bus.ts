type Bus = {
  ram: number[];
};

const initializeBus = (): Bus => ({
  ram: "_"
    .repeat(0x10000)
    .split("")
    .map((v) => 0),
});

export type { Bus };

export { initializeBus };
