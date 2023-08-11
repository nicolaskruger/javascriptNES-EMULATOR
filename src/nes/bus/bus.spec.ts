import { initializeCpu } from "../cpu/cpu";
import { Bus, initializeBus, readBuz } from "./bus";

describe("bus", () => {
  it("initialize bus", () => {
    const bus = initializeBus();

    expect(bus.ram.length).toBe(0x10000);

    bus.ram.forEach((value) => expect(value).toBe(0));
  });

  it("should not read value from buzz when exceed your limit", () => {
    const bus = initializeBus();

    const newBus: Bus = {
      ...bus,
      ram: bus.ram.map((v) => 1),
    };

    expect(readBuz(newBus, -1)).toBe(0);

    expect(readBuz(newBus, 0x10000)).toBe(0);
  });

  it("should read value from buzz", () => {
    const bus = initializeBus();

    expect(readBuz(bus, 1)).toBe(0);
  });
});
