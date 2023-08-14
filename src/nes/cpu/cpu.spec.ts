import { writeBus } from "../bus/bus";
import { initializeNes } from "../nes";
import { CARRY_BIT, Cpu, UNUSED, getFlag, initializeCpu, reset } from "./cpu";

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
});
