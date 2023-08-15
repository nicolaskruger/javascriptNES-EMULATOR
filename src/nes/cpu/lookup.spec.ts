import { initializeNes } from "../nes";
import { ABS, ABX, ABY, IMM, IMP, REL, ZP0, ZPX } from "./lookup";

describe("lookup", () => {
  it("IMP", () => {
    const nes = initializeNes();

    nes.cpu.a = 0xff;

    const { cycles, nes: newNes } = IMP(nes);

    expect(cycles).toBe(0);

    expect(newNes.cpu.fetched).toBe(0xff);
  });

  it("IMP", () => {
    const nes = initializeNes();

    nes.cpu.pc = 0x01;

    const { nes: newNes, cycles } = IMM(nes);

    expect(cycles).toBe(0);

    const { cpu } = newNes;
    expect(cpu.pc).toBe(2);
    expect(cpu.addrAbs).toBe(1);
  });
  it("ZPO", () => {
    const nes = initializeNes();

    nes.bus.ram[0] = 0xcd;

    nes.cpu.addrAbs = 0xff00;

    const { nes: newNes, cycles } = ZP0(nes);

    expect(cycles).toBe(0);

    const { cpu } = newNes;

    expect(cpu.addrAbs).toBe(0xcd);

    expect(cpu.pc).toBe(1);
  });
  it("ZPX", () => {
    const nes = initializeNes();

    nes.bus.ram[0] = 0xcd;

    nes.cpu.addrAbs = 0xff00;

    nes.cpu.x = 0xff;

    const { nes: newNes, cycles } = ZPX(nes);

    expect(cycles).toBe(0);

    const { cpu } = newNes;

    expect(cpu.addrAbs).toBe(0xcc);

    expect(cpu.pc).toBe(1);
  });

  it("should rel when and operator with 1000-0000 not zero", () => {
    const oldNes = initializeNes();

    oldNes.bus.ram[0] = 0xff;

    const { cycles, nes } = REL(oldNes);

    expect(cycles).toBe(0);

    expect(nes.cpu.pc).toBe(1);

    expect(nes.cpu.addrRel).toBe(0xffff);
  });

  it("should rel when and operator with 1000-0000 is zero", () => {
    const oldNes = initializeNes();

    oldNes.bus.ram[0] = 0x0f;

    const { cycles, nes } = REL(oldNes);

    expect(cycles).toBe(0);

    expect(nes.cpu.pc).toBe(1);

    expect(nes.cpu.addrRel).toBe(0x000f);
  });

  it("ABS", () => {
    const oldNes = initializeNes();

    oldNes.bus.ram[0] = 0xff;
    oldNes.bus.ram[1] = 0xff;

    const { cycles, nes } = ABS(oldNes);

    expect(cycles).toBe(0);

    expect(nes.cpu.pc).toBe(2);

    expect(nes.cpu.addrAbs).toBe(0xffff);
  });

  it("should perform one ABX when change page", () => {
    const oldNes = initializeNes();

    oldNes.cpu.x = 1;
    oldNes.bus.ram[0] = 0xff;
    oldNes.bus.ram[1] = 0xff;

    const { cycles, nes } = ABX(oldNes);

    expect(cycles).toBe(1);

    expect(nes.cpu.pc).toBe(2);

    expect(nes.cpu.addrAbs).toBe(0x0000);
  });

  it("should perform one ABX when not change page", () => {
    const oldNes = initializeNes();

    oldNes.cpu.x = 1;
    oldNes.bus.ram[0] = 0xfe;
    oldNes.bus.ram[1] = 0xff;

    const { cycles, nes } = ABX(oldNes);

    expect(cycles).toBe(0);

    expect(nes.cpu.pc).toBe(2);

    expect(nes.cpu.addrAbs).toBe(0xffff);
  });

  it("should perform one ABY when change page", () => {
    const oldNes = initializeNes();

    oldNes.cpu.y = 1;
    oldNes.bus.ram[0] = 0xff;
    oldNes.bus.ram[1] = 0xff;

    const { cycles, nes } = ABY(oldNes);

    expect(cycles).toBe(1);

    expect(nes.cpu.pc).toBe(2);

    expect(nes.cpu.addrAbs).toBe(0x0000);
  });

  it("should perform one ABY when not change page", () => {
    const oldNes = initializeNes();

    oldNes.cpu.y = 1;
    oldNes.bus.ram[0] = 0xfe;
    oldNes.bus.ram[1] = 0xff;

    const { cycles, nes } = ABY(oldNes);

    expect(cycles).toBe(0);

    expect(nes.cpu.pc).toBe(2);

    expect(nes.cpu.addrAbs).toBe(0xffff);
  });
});
