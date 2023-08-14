import { readBuz } from "../bus/bus";
import { NES } from "../nes";

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
  addrAbs: number;
  addrRel: number;
  opcode: number;
  cycles: number;
  clockCount: number;
};

const initializeCpu = (): Cpu => ({
  a: 0,
  addrAbs: 0,
  addrRel: 0,
  clockCount: 0,
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

const CARRY_BIT = 1;
const ZERO = 1 << 1;
const DISABLE_INTERRUPT = 1 << 2;
const DECIMAL_MODE = 1 << 3;
const BREAK = 1 << 4;
const UNUSED = 1 << 5;
const OVERFLOW = 1 << 6;
const NEGATIVE = 1 << 7;

const getFlag = (flag: number, cpu: Cpu): number => {
  const { status } = cpu;
  return (status & flag) > 0 ? 1 : 0;
};

const setFlag = (flag: number, value: number, cpu: Cpu): Cpu => {
  return {
    ...cpu,
  };
};

const reset = (nes: NES): NES => {
  const { bus, cpu } = nes;

  const add = 0xfffc;

  const lo = readBuz(bus, add);
  const hi = readBuz(bus, add + 1);

  const pc = (hi << 8) + lo;

  const a = 0;
  const x = 0;
  const y = 0;
  const stkp = 0xfd;
  const status = UNUSED;

  const addrRel = 0;
  const addrAbs = 0;

  const fetched = 0;

  const cycles = 8;

  return {
    ...nes,
    cpu: {
      ...cpu,
      pc,
      a,
      x,
      stkp,
      y,
      status,
      addrAbs,
      addrRel,
      fetched,
      cycles,
    },
  };
};

export { initializeCpu, reset, getFlag, setFlag };

export {
  CARRY_BIT,
  ZERO,
  DISABLE_INTERRUPT,
  DECIMAL_MODE,
  BREAK,
  UNUSED,
  OVERFLOW,
  NEGATIVE,
};

export { Cpu };
