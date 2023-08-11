type Cpu = {
  // registers
  a: number;
  x: number;
  y: number;
  stkp: number;
  pc: number;
  status: number;
  // helpers
  fetched: number;
  temp: number;
  addr_abs: number;
  addr_rel: number;
  opcode: number;
  cycles: number;
  clock_count: number;
};

const initializeCpu = (): Cpu => {
  return {} as Cpu;
};

export { initializeCpu };

export { Cpu };
