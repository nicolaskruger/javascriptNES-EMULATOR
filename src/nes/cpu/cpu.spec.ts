import { Cpu, initializeCpu } from "./cpu";

describe("cpu", () => {
  it("initialize cpu", () => {
    const cpu = initializeCpu();

    const keys: (keyof Cpu)[] = [
      "a",
      "addr_abs",
      "addr_rel",
      "clock_count",
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
});
