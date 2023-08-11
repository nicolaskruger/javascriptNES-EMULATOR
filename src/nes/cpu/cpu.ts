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

const initializeCpu = (): Cpu => ({
  a: 0,
  addr_abs: 0,
  addr_rel: 0,
  clock_count: 0,
  cycles: 0,
  fetched: 0,
  opcode: 0,
  pc: 0,
  status: 0,
  stkp: 0,
  temp: 0,
  x: 0,
  y: 0,
});

export { initializeCpu };

export { Cpu };
