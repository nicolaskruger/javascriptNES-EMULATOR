import { initializeCpu } from "../cpu/cpu";
import { initializeBus } from "./bus";

describe("bus", () => {
  it("initialize bus", () => {
    const bus = initializeBus();

    expect(bus.ram.length).toBe(0x10000);

    bus.ram.forEach((value) => expect(value).toBe(0));
  });
});
