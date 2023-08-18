import { mask16bit, mask8bit } from "../../util/calculator/mask";
import { deepClone } from "../../util/deep-clone/deep-clone";
import { readBuz } from "../bus/bus";
import { NES } from "../nes";

type ReturnInstruct = {
  cycles: number;
  nes: NES;
};

type Instruction = {
  operate: (nes: NES) => ReturnInstruct;
  addrMode: (nes: NES) => ReturnInstruct;
  cycles: number;
};

// addr mode

const IMP = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  newNes.cpu.fetched = newNes.cpu.a;

  return {
    nes: newNes,
    cycles: 0,
  };
};
const IMM = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  newNes.cpu.addrAbs = newNes.cpu.pc++;

  newNes.cpu.pc &= 0xffff;

  return {
    cycles: 0,
    nes: newNes,
  };
};
const ZP0 = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { cpu, bus } = newNes;

  cpu.addrAbs = mask8bit(readBuz(bus, cpu.pc++));

  cpu.pc &= 0xffff;

  return {
    cycles: 0,
    nes: newNes,
  };
};

const ZP = (nes: NES, offset: number): NES => {
  const newNes = deepClone(nes);

  const { cpu, bus } = newNes;

  cpu.addrAbs = mask8bit(readBuz(bus, cpu.pc++) + offset);

  cpu.pc &= 0xffff;

  return {
    ...newNes,
  };
};

const ZPX = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes: ZP(nes, nes.cpu.x),
  };
};
const ZPY = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
  };
};
const REL = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { bus, cpu } = newNes;

  let addRel = readBuz(bus, cpu.pc);

  cpu.pc++;
  cpu.pc &= 0xffff;

  if (addRel & 0x80) addRel |= 0xff00;

  cpu.addrRel = addRel;

  return {
    nes: newNes,
    cycles: 0,
  };
};
const ABS = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { bus, cpu } = newNes;

  const lo = readBuz(bus, cpu.pc++);
  cpu.pc &= 0xffff;
  const hi = readBuz(bus, cpu.pc++);
  cpu.pc &= 0xffff;
  cpu.addrAbs = (hi << 8) | lo;

  return {
    cycles: 0,
    nes: newNes,
  };
};

const ABOffset = (nes: NES, offset: number): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { bus, cpu } = newNes;

  const lo = readBuz(bus, cpu.pc++);
  cpu.pc &= 0xffff;
  const hi = readBuz(bus, cpu.pc++);
  cpu.pc &= 0xffff;

  cpu.addrAbs = mask16bit(((hi << 8) | lo) + offset);

  const cycles = (cpu.addrAbs & 0xff00) !== hi << 8 ? 1 : 0;

  return { cycles, nes: newNes };
};

const ABX = (nes: NES): ReturnInstruct => {
  return ABOffset(nes, nes.cpu.x);
};
const ABY = (nes: NES): ReturnInstruct => {
  return ABOffset(nes, nes.cpu.y);
};
const IND = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { bus, cpu } = newNes;

  const lo = readBuz(bus, cpu.pc++);
  cpu.pc &= 0xffff;

  const hi = readBuz(bus, cpu.pc++);
  cpu.pc &= 0xffff;

  const ptr = (hi << 8) | lo;

  const hiAbs =
    lo === 0xff ? readBuz(bus, ptr & 0xff00) : readBuz(bus, mask16bit(ptr + 1));

  cpu.addrAbs = (hiAbs << 8) | readBuz(bus, ptr);

  return {
    cycles: 0,
    nes: newNes,
  };
};
const IZX = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { bus, cpu } = newNes;

  const value = readBuz(bus, cpu.pc++);

  cpu.pc &= 0xffff;

  const { x } = cpu;

  const readOffset = (offset: number) =>
    readBuz(bus, mask16bit(value + x + offset) & 0xff);

  const lo = readOffset(0);
  const hi = readOffset(1);

  cpu.addrAbs = (hi << 8) | lo;

  return {
    cycles: 0,
    nes: newNes,
  };
};
const IZY = (nes: NES): ReturnInstruct => {
  const { bus, cpu } = deepClone(nes);

  const value = readBuz(bus, cpu.pc++);

  cpu.pc &= 0xffff;

  const lo = readBuz(bus, value & 0xff);
  const hi = readBuz(bus, (value + 1) & 0xff);

  cpu.addrAbs = (hi << 8) + lo;

  cpu.addrAbs += cpu.y;

  cpu.addrAbs &= 0xffff;

  const cycles = (cpu.addrAbs & 0xff00) !== hi << 8 ? 1 : 0;

  return {
    cycles,
    nes: {
      bus,
      cpu,
    },
  };
};

// opcode

const ADC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const AND = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const ASL = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BCC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BCS = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BEQ = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BIT = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BMI = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BNE = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BPL = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BRK = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BVC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const BVS = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CLC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CLD = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CLI = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CLV = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CMP = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CPX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const CPY = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const DEC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const DEX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const DEY = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const EOR = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const INC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const INX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const INY = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const JMP = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const JSR = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const LDA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const LDX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const LDY = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const LSR = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const NOP = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const ORA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const PHA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const PHP = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const PLA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const PLP = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const ROL = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const ROR = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const RTI = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const RTS = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const SBC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const SEC = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const SED = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const SEI = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const STA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const STX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const STY = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const TAX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const TAY = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const TSX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const TXA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const TXS = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const TYA = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};
const XXX = (nes: NES): ReturnInstruct => {
  return {
    nes,
    cycles: 0,
  };
};

const lookup: Instruction[] = [
  { operate: BRK, addrMode: IMM, cycles: 7 },
  { operate: ORA, addrMode: IZX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 3 },
  { operate: ORA, addrMode: ZP0, cycles: 3 },
  { operate: ASL, addrMode: ZP0, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: PHP, addrMode: IMP, cycles: 3 },
  { operate: ORA, addrMode: IMM, cycles: 2 },
  { operate: ASL, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: ORA, addrMode: ABS, cycles: 4 },
  { operate: ASL, addrMode: ABS, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: BPL, addrMode: REL, cycles: 2 },
  { operate: ORA, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: ORA, addrMode: ZPX, cycles: 4 },
  { operate: ASL, addrMode: ZPX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: CLC, addrMode: IMP, cycles: 2 },
  { operate: ORA, addrMode: ABY, cycles: 4 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: ORA, addrMode: ABX, cycles: 4 },
  { operate: ASL, addrMode: ABX, cycles: 7 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: JSR, addrMode: ABS, cycles: 6 },
  { operate: AND, addrMode: IZX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: BIT, addrMode: ZP0, cycles: 3 },
  { operate: AND, addrMode: ZP0, cycles: 3 },
  { operate: ROL, addrMode: ZP0, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: PLP, addrMode: IMP, cycles: 4 },
  { operate: AND, addrMode: IMM, cycles: 2 },
  { operate: ROL, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: BIT, addrMode: ABS, cycles: 4 },
  { operate: AND, addrMode: ABS, cycles: 4 },
  { operate: ROL, addrMode: ABS, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: BMI, addrMode: REL, cycles: 2 },
  { operate: AND, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: AND, addrMode: ZPX, cycles: 4 },
  { operate: ROL, addrMode: ZPX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: SEC, addrMode: IMP, cycles: 2 },
  { operate: AND, addrMode: ABY, cycles: 4 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: AND, addrMode: ABX, cycles: 4 },
  { operate: ROL, addrMode: ABX, cycles: 7 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: RTI, addrMode: IMP, cycles: 6 },
  { operate: EOR, addrMode: IZX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 3 },
  { operate: EOR, addrMode: ZP0, cycles: 3 },
  { operate: LSR, addrMode: ZP0, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: PHA, addrMode: IMP, cycles: 3 },
  { operate: EOR, addrMode: IMM, cycles: 2 },
  { operate: LSR, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: JMP, addrMode: ABS, cycles: 3 },
  { operate: EOR, addrMode: ABS, cycles: 4 },
  { operate: LSR, addrMode: ABS, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: BVC, addrMode: REL, cycles: 2 },
  { operate: EOR, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: EOR, addrMode: ZPX, cycles: 4 },
  { operate: LSR, addrMode: ZPX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: CLI, addrMode: IMP, cycles: 2 },
  { operate: EOR, addrMode: ABY, cycles: 4 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: EOR, addrMode: ABX, cycles: 4 },
  { operate: LSR, addrMode: ABX, cycles: 7 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: RTS, addrMode: IMP, cycles: 6 },
  { operate: ADC, addrMode: IZX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 3 },
  { operate: ADC, addrMode: ZP0, cycles: 3 },
  { operate: ROR, addrMode: ZP0, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: PLA, addrMode: IMP, cycles: 4 },
  { operate: ADC, addrMode: IMM, cycles: 2 },
  { operate: ROR, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: JMP, addrMode: IND, cycles: 5 },
  { operate: ADC, addrMode: ABS, cycles: 4 },
  { operate: ROR, addrMode: ABS, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: BVS, addrMode: REL, cycles: 2 },
  { operate: ADC, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: ADC, addrMode: ZPX, cycles: 4 },
  { operate: ROR, addrMode: ZPX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: SEI, addrMode: IMP, cycles: 2 },
  { operate: ADC, addrMode: ABY, cycles: 4 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: ADC, addrMode: ABX, cycles: 4 },
  { operate: ROR, addrMode: ABX, cycles: 7 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: STA, addrMode: IZX, cycles: 6 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: STY, addrMode: ZP0, cycles: 3 },
  { operate: STA, addrMode: ZP0, cycles: 3 },
  { operate: STX, addrMode: ZP0, cycles: 3 },
  { operate: XXX, addrMode: IMP, cycles: 3 },
  { operate: DEY, addrMode: IMP, cycles: 2 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: TXA, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: STY, addrMode: ABS, cycles: 4 },
  { operate: STA, addrMode: ABS, cycles: 4 },
  { operate: STX, addrMode: ABS, cycles: 4 },
  { operate: XXX, addrMode: IMP, cycles: 4 },
  { operate: BCC, addrMode: REL, cycles: 2 },
  { operate: STA, addrMode: IZY, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: STY, addrMode: ZPX, cycles: 4 },
  { operate: STA, addrMode: ZPX, cycles: 4 },
  { operate: STX, addrMode: ZPY, cycles: 4 },
  { operate: XXX, addrMode: IMP, cycles: 4 },
  { operate: TYA, addrMode: IMP, cycles: 2 },
  { operate: STA, addrMode: ABY, cycles: 5 },
  { operate: TXS, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: NOP, addrMode: IMP, cycles: 5 },
  { operate: STA, addrMode: ABX, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: LDY, addrMode: IMM, cycles: 2 },
  { operate: LDA, addrMode: IZX, cycles: 6 },
  { operate: LDX, addrMode: IMM, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: LDY, addrMode: ZP0, cycles: 3 },
  { operate: LDA, addrMode: ZP0, cycles: 3 },
  { operate: LDX, addrMode: ZP0, cycles: 3 },
  { operate: XXX, addrMode: IMP, cycles: 3 },
  { operate: TAY, addrMode: IMP, cycles: 2 },
  { operate: LDA, addrMode: IMM, cycles: 2 },
  { operate: TAX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: LDY, addrMode: ABS, cycles: 4 },
  { operate: LDA, addrMode: ABS, cycles: 4 },
  { operate: LDX, addrMode: ABS, cycles: 4 },
  { operate: XXX, addrMode: IMP, cycles: 4 },
  { operate: BCS, addrMode: REL, cycles: 2 },
  { operate: LDA, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: LDY, addrMode: ZPX, cycles: 4 },
  { operate: LDA, addrMode: ZPX, cycles: 4 },
  { operate: LDX, addrMode: ZPY, cycles: 4 },
  { operate: XXX, addrMode: IMP, cycles: 4 },
  { operate: CLV, addrMode: IMP, cycles: 2 },
  { operate: LDA, addrMode: ABY, cycles: 4 },
  { operate: TSX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 4 },
  { operate: LDY, addrMode: ABX, cycles: 4 },
  { operate: LDA, addrMode: ABX, cycles: 4 },
  { operate: LDX, addrMode: ABY, cycles: 4 },
  { operate: XXX, addrMode: IMP, cycles: 4 },
  { operate: CPY, addrMode: IMM, cycles: 2 },
  { operate: CMP, addrMode: IZX, cycles: 6 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: CPY, addrMode: ZP0, cycles: 3 },
  { operate: CMP, addrMode: ZP0, cycles: 3 },
  { operate: DEC, addrMode: ZP0, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: INY, addrMode: IMP, cycles: 2 },
  { operate: CMP, addrMode: IMM, cycles: 2 },
  { operate: DEX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: CPY, addrMode: ABS, cycles: 4 },
  { operate: CMP, addrMode: ABS, cycles: 4 },
  { operate: DEC, addrMode: ABS, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: BNE, addrMode: REL, cycles: 2 },
  { operate: CMP, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: CMP, addrMode: ZPX, cycles: 4 },
  { operate: DEC, addrMode: ZPX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: CLD, addrMode: IMP, cycles: 2 },
  { operate: CMP, addrMode: ABY, cycles: 4 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: CMP, addrMode: ABX, cycles: 4 },
  { operate: DEC, addrMode: ABX, cycles: 7 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: CPX, addrMode: IMM, cycles: 2 },
  { operate: SBC, addrMode: IZX, cycles: 6 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: CPX, addrMode: ZP0, cycles: 3 },
  { operate: SBC, addrMode: ZP0, cycles: 3 },
  { operate: INC, addrMode: ZP0, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 5 },
  { operate: INX, addrMode: IMP, cycles: 2 },
  { operate: SBC, addrMode: IMM, cycles: 2 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: SBC, addrMode: IMP, cycles: 2 },
  { operate: CPX, addrMode: ABS, cycles: 4 },
  { operate: SBC, addrMode: ABS, cycles: 4 },
  { operate: INC, addrMode: ABS, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: BEQ, addrMode: REL, cycles: 2 },
  { operate: SBC, addrMode: IZY, cycles: 5 },
  { operate: XXX, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 8 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: SBC, addrMode: ZPX, cycles: 4 },
  { operate: INC, addrMode: ZPX, cycles: 6 },
  { operate: XXX, addrMode: IMP, cycles: 6 },
  { operate: SED, addrMode: IMP, cycles: 2 },
  { operate: SBC, addrMode: ABY, cycles: 4 },
  { operate: NOP, addrMode: IMP, cycles: 2 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
  { operate: NOP, addrMode: IMP, cycles: 4 },
  { operate: SBC, addrMode: ABX, cycles: 4 },
  { operate: INC, addrMode: ABX, cycles: 7 },
  { operate: XXX, addrMode: IMP, cycles: 7 },
];

export { IMP, IMM, ZP0, ZPX, REL, ABS, ABX, ABY, IND, IZX, IZY, lookup };
