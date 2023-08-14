import { writeBus } from "../bus/bus";
import { initializeNes } from "../nes";
import {
  CARRY_BIT,
  Cpu,
  UNUSED,
  getFlag,
  initializeCpu,
  irq,
  reset,
  setFlag,
} from "./cpu";

describe("cpu", () => {
  it("initialize cpu", () => {
    const cpu = initializeCpu();

    const keys: (keyof Cpu)[] = [
      "a",
      "addrAbs",
      "addrRel",
      "clockCount",
      "cycles",
      "fetched",
      "opcode",
      "pc",
      "status",
      "stkp",
      "temp",
      "x",
      "y",
    ];

    keys.forEach((key) => expect(cpu[key]).toBe(0));
  });

  it("should reset the cpu", () => {
    const nes = initializeNes();

    const { bus } = nes;

    const bus01 = writeBus(bus, 0xfffc, 0xff);
    const bus02 = writeBus(bus01, 0xfffc + 1, 0xff);

    const newNes = reset({ ...nes, bus: bus02 });

    const { cpu } = newNes;

    const { addrAbs, pc, a, x, y, stkp, status, addrRel, fetched, cycles } =
      cpu;

    expect(addrAbs).toBe(0);
    expect(pc).toBe(0xffff);
    expect(a).toBe(0);
    expect(x).toBe(0);
    expect(y).toBe(0);
    expect(stkp).toBe(0xfd);
    expect(status).toBe(UNUSED);
    expect(addrRel).toBe(0);
    expect(fetched).toBe(0);
    expect(cycles).toBe(8);
  });

  it("should return true when flag is true", () => {
    const cpu = initializeCpu();

    cpu.status = 0xff;

    expect(getFlag(CARRY_BIT, cpu)).toBe(1);
  });

  it("should set flag to one", () => {
    let cpu = initializeCpu();

    expect(cpu.status).toBe(0x00);

    cpu = setFlag(CARRY_BIT, 1, cpu);

    expect(cpu.status).toBe(1);

    cpu = setFlag(CARRY_BIT, 0, cpu);

    expect(cpu.status).toBe(0);
  });

  it("should not interrupt when flag active", () => {
    const nes = initializeNes();

    nes.cpu.status = 1 << 2;

    expect(irq(nes)).toStrictEqual(nes);
  });

  it("should perform an interrupt", () => {
    let nes = initializeNes();

    const { cpu } = nes;

    cpu.stkp = 0xff;

    cpu.pc = 0xf0f1;

    nes.bus.ram[0xffff] = 0xff;

    nes = irq(nes);

    const { bus } = nes;

    const { ram } = bus;

    expect(ram[0x01ff]).toBe(0xf0);
    expect(ram[0x01fe]).toBe(0xf1);

    const { status, stkp, addrAbs, pc, cycles } = nes.cpu;

    //00100100
    expect(status).toBe(0x24);

    expect(ram[0x01fd]).toBe(0x24);

    expect(stkp).toBe(0xfc);

    expect(addrAbs).toBe(0xfffe);

    expect(pc).toBe(0xff00);

    expect(cycles).toBe(7);
  });
});
