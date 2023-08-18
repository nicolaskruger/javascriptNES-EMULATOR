import { mask16bit, mask8bit } from "../../util/calculator/mask";
import { deepClone } from "../../util/deep-clone/deep-clone";
import { Bus, read2BytesFromBuss, readBuz, writeBus } from "../bus/bus";
import { NES } from "../nes";
import { IMP, lookup } from "./lookup";

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
  let status = cpu.status;

  if (value) status |= flag;
  else status &= ~flag;
  return {
    ...cpu,
    status,
  };
};

const reset = (nes: NES): NES => {
  const { bus, cpu } = nes;

  const add = 0xfffc;

  const lo = readBuz(bus, add);
  const hi = readBuz(bus, add + 1);

  const pc = (hi << 8) | lo;

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

const interrupt = (nes: NES, cycles: number, addrAbs: number): NES => {
  let bus = { ...nes.bus };
  let cpu = { ...nes.cpu };

  let stkp = cpu.stkp;

  let pc = cpu.pc;

  bus = writeBus(bus, mask16bit(0x0100 + stkp), mask8bit(pc >> 8));
  stkp = mask8bit(stkp - 1);
  bus = writeBus(bus, mask16bit(0x0100 + stkp), mask8bit(pc));
  stkp = mask8bit(stkp - 1);
  cpu = setFlag(BREAK, 0, cpu);
  cpu = setFlag(UNUSED, 1, cpu);
  cpu = setFlag(DISABLE_INTERRUPT, 1, cpu);

  let status = cpu.status;
  bus = writeBus(bus, mask16bit(0x0100 + stkp), status);
  stkp = mask8bit(stkp - 1);

  pc = read2BytesFromBuss(bus, addrAbs);

  return {
    bus,
    cpu: {
      ...cpu,
      stkp,
      status,
      pc,
      addrAbs,
      cycles,
    },
  };
};

const irq = (nes: NES): NES => {
  if (getFlag(DISABLE_INTERRUPT, nes.cpu)) return { ...nes };

  return interrupt(nes, 7, 0xfffe);
};

const nmi = (nes: NES): NES => {
  return interrupt(nes, 8, 0xfffa);
};

const clock = (nes: NES): NES => {
  return { ...nes };
};

const fetch = (nes: NES): NES => {
  const newNes = deepClone(nes);

  const { bus, cpu } = newNes;

  const { addrMode } = lookup[cpu.opcode];

  if (!(lookup[newNes.cpu.opcode].addrMode === IMP))
    cpu.fetched = readBuz(bus, cpu.addrAbs);
  return { ...newNes };
};

export { initializeCpu, reset, getFlag, setFlag, irq, nmi, fetch };

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
