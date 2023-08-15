import { mask8bit } from "../../util/calculator/mask";
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

  return {
    cycles: 0,
    nes: newNes,
  };
};
const ZP0 = (nes: NES): ReturnInstruct => {
  const newNes = deepClone(nes);

  const { cpu, bus } = newNes;

  cpu.addrAbs = mask8bit(readBuz(bus, cpu.pc++));

  return {
    cycles: 0,
    nes: newNes,
  };
};

const ZP = (nes: NES, offset: number): NES => {
  const newNes = deepClone(nes);

  const { cpu, bus } = newNes;

  cpu.addrAbs = mask8bit(readBuz(bus, cpu.pc++) + offset);

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
  return {
    cycles: 0,
    nes,
  };
};
const ABS = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
  };
};
const ABX = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
  };
};
const ABY = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
  };
};
const IND = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
  };
};
const IZX = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
  };
};
const IZY = (nes: NES): ReturnInstruct => {
  return {
    cycles: 0,
    nes,
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
  { addrMode: BRK, operate: IMM, cycles: 7 },
  { addrMode: ORA, operate: IZX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 3 },
  { addrMode: ORA, operate: ZP0, cycles: 3 },
  { addrMode: ASL, operate: ZP0, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: PHP, operate: IMP, cycles: 3 },
  { addrMode: ORA, operate: IMM, cycles: 2 },
  { addrMode: ASL, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: ORA, operate: ABS, cycles: 4 },
  { addrMode: ASL, operate: ABS, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: BPL, operate: REL, cycles: 2 },
  { addrMode: ORA, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: ORA, operate: ZPX, cycles: 4 },
  { addrMode: ASL, operate: ZPX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: CLC, operate: IMP, cycles: 2 },
  { addrMode: ORA, operate: ABY, cycles: 4 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: ORA, operate: ABX, cycles: 4 },
  { addrMode: ASL, operate: ABX, cycles: 7 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: JSR, operate: ABS, cycles: 6 },
  { addrMode: AND, operate: IZX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: BIT, operate: ZP0, cycles: 3 },
  { addrMode: AND, operate: ZP0, cycles: 3 },
  { addrMode: ROL, operate: ZP0, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: PLP, operate: IMP, cycles: 4 },
  { addrMode: AND, operate: IMM, cycles: 2 },
  { addrMode: ROL, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: BIT, operate: ABS, cycles: 4 },
  { addrMode: AND, operate: ABS, cycles: 4 },
  { addrMode: ROL, operate: ABS, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: BMI, operate: REL, cycles: 2 },
  { addrMode: AND, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: AND, operate: ZPX, cycles: 4 },
  { addrMode: ROL, operate: ZPX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: SEC, operate: IMP, cycles: 2 },
  { addrMode: AND, operate: ABY, cycles: 4 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: AND, operate: ABX, cycles: 4 },
  { addrMode: ROL, operate: ABX, cycles: 7 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: RTI, operate: IMP, cycles: 6 },
  { addrMode: EOR, operate: IZX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 3 },
  { addrMode: EOR, operate: ZP0, cycles: 3 },
  { addrMode: LSR, operate: ZP0, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: PHA, operate: IMP, cycles: 3 },
  { addrMode: EOR, operate: IMM, cycles: 2 },
  { addrMode: LSR, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: JMP, operate: ABS, cycles: 3 },
  { addrMode: EOR, operate: ABS, cycles: 4 },
  { addrMode: LSR, operate: ABS, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: BVC, operate: REL, cycles: 2 },
  { addrMode: EOR, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: EOR, operate: ZPX, cycles: 4 },
  { addrMode: LSR, operate: ZPX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: CLI, operate: IMP, cycles: 2 },
  { addrMode: EOR, operate: ABY, cycles: 4 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: EOR, operate: ABX, cycles: 4 },
  { addrMode: LSR, operate: ABX, cycles: 7 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: RTS, operate: IMP, cycles: 6 },
  { addrMode: ADC, operate: IZX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 3 },
  { addrMode: ADC, operate: ZP0, cycles: 3 },
  { addrMode: ROR, operate: ZP0, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: PLA, operate: IMP, cycles: 4 },
  { addrMode: ADC, operate: IMM, cycles: 2 },
  { addrMode: ROR, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: JMP, operate: IND, cycles: 5 },
  { addrMode: ADC, operate: ABS, cycles: 4 },
  { addrMode: ROR, operate: ABS, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: BVS, operate: REL, cycles: 2 },
  { addrMode: ADC, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: ADC, operate: ZPX, cycles: 4 },
  { addrMode: ROR, operate: ZPX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: SEI, operate: IMP, cycles: 2 },
  { addrMode: ADC, operate: ABY, cycles: 4 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: ADC, operate: ABX, cycles: 4 },
  { addrMode: ROR, operate: ABX, cycles: 7 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: STA, operate: IZX, cycles: 6 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: STY, operate: ZP0, cycles: 3 },
  { addrMode: STA, operate: ZP0, cycles: 3 },
  { addrMode: STX, operate: ZP0, cycles: 3 },
  { addrMode: XXX, operate: IMP, cycles: 3 },
  { addrMode: DEY, operate: IMP, cycles: 2 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: TXA, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: STY, operate: ABS, cycles: 4 },
  { addrMode: STA, operate: ABS, cycles: 4 },
  { addrMode: STX, operate: ABS, cycles: 4 },
  { addrMode: XXX, operate: IMP, cycles: 4 },
  { addrMode: BCC, operate: REL, cycles: 2 },
  { addrMode: STA, operate: IZY, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: STY, operate: ZPX, cycles: 4 },
  { addrMode: STA, operate: ZPX, cycles: 4 },
  { addrMode: STX, operate: ZPY, cycles: 4 },
  { addrMode: XXX, operate: IMP, cycles: 4 },
  { addrMode: TYA, operate: IMP, cycles: 2 },
  { addrMode: STA, operate: ABY, cycles: 5 },
  { addrMode: TXS, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: NOP, operate: IMP, cycles: 5 },
  { addrMode: STA, operate: ABX, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: LDY, operate: IMM, cycles: 2 },
  { addrMode: LDA, operate: IZX, cycles: 6 },
  { addrMode: LDX, operate: IMM, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: LDY, operate: ZP0, cycles: 3 },
  { addrMode: LDA, operate: ZP0, cycles: 3 },
  { addrMode: LDX, operate: ZP0, cycles: 3 },
  { addrMode: XXX, operate: IMP, cycles: 3 },
  { addrMode: TAY, operate: IMP, cycles: 2 },
  { addrMode: LDA, operate: IMM, cycles: 2 },
  { addrMode: TAX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: LDY, operate: ABS, cycles: 4 },
  { addrMode: LDA, operate: ABS, cycles: 4 },
  { addrMode: LDX, operate: ABS, cycles: 4 },
  { addrMode: XXX, operate: IMP, cycles: 4 },
  { addrMode: BCS, operate: REL, cycles: 2 },
  { addrMode: LDA, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: LDY, operate: ZPX, cycles: 4 },
  { addrMode: LDA, operate: ZPX, cycles: 4 },
  { addrMode: LDX, operate: ZPY, cycles: 4 },
  { addrMode: XXX, operate: IMP, cycles: 4 },
  { addrMode: CLV, operate: IMP, cycles: 2 },
  { addrMode: LDA, operate: ABY, cycles: 4 },
  { addrMode: TSX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 4 },
  { addrMode: LDY, operate: ABX, cycles: 4 },
  { addrMode: LDA, operate: ABX, cycles: 4 },
  { addrMode: LDX, operate: ABY, cycles: 4 },
  { addrMode: XXX, operate: IMP, cycles: 4 },
  { addrMode: CPY, operate: IMM, cycles: 2 },
  { addrMode: CMP, operate: IZX, cycles: 6 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: CPY, operate: ZP0, cycles: 3 },
  { addrMode: CMP, operate: ZP0, cycles: 3 },
  { addrMode: DEC, operate: ZP0, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: INY, operate: IMP, cycles: 2 },
  { addrMode: CMP, operate: IMM, cycles: 2 },
  { addrMode: DEX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: CPY, operate: ABS, cycles: 4 },
  { addrMode: CMP, operate: ABS, cycles: 4 },
  { addrMode: DEC, operate: ABS, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: BNE, operate: REL, cycles: 2 },
  { addrMode: CMP, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: CMP, operate: ZPX, cycles: 4 },
  { addrMode: DEC, operate: ZPX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: CLD, operate: IMP, cycles: 2 },
  { addrMode: CMP, operate: ABY, cycles: 4 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: CMP, operate: ABX, cycles: 4 },
  { addrMode: DEC, operate: ABX, cycles: 7 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: CPX, operate: IMM, cycles: 2 },
  { addrMode: SBC, operate: IZX, cycles: 6 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: CPX, operate: ZP0, cycles: 3 },
  { addrMode: SBC, operate: ZP0, cycles: 3 },
  { addrMode: INC, operate: ZP0, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 5 },
  { addrMode: INX, operate: IMP, cycles: 2 },
  { addrMode: SBC, operate: IMM, cycles: 2 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: SBC, operate: IMP, cycles: 2 },
  { addrMode: CPX, operate: ABS, cycles: 4 },
  { addrMode: SBC, operate: ABS, cycles: 4 },
  { addrMode: INC, operate: ABS, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: BEQ, operate: REL, cycles: 2 },
  { addrMode: SBC, operate: IZY, cycles: 5 },
  { addrMode: XXX, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 8 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: SBC, operate: ZPX, cycles: 4 },
  { addrMode: INC, operate: ZPX, cycles: 6 },
  { addrMode: XXX, operate: IMP, cycles: 6 },
  { addrMode: SED, operate: IMP, cycles: 2 },
  { addrMode: SBC, operate: ABY, cycles: 4 },
  { addrMode: NOP, operate: IMP, cycles: 2 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
  { addrMode: NOP, operate: IMP, cycles: 4 },
  { addrMode: SBC, operate: ABX, cycles: 4 },
  { addrMode: INC, operate: ABX, cycles: 7 },
  { addrMode: XXX, operate: IMP, cycles: 7 },
];

export { IMP, IMM, ZP0, ZPX };
