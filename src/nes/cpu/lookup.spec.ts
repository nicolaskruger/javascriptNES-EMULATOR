import { initializeNes } from "../nes";
import { IMM, IMP } from "./lookup";

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
});
