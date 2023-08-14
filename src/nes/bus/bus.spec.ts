import { initializeCpu } from "../cpu/cpu";
import {
  Bus,
  initializeBus,
  read2BytesFromBuss,
  readBuz,
  writeBus,
} from "./bus";

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

  it("should not write on bus when exceed your limit", () => {
    const bus = initializeBus();

    const newBus = writeBus(bus, 0x10000, 1);

    newBus.ram.forEach((v) => expect(v).toBe(0));
  });

  it("should write a value on the bus", () => {
    const bus = initializeBus();

    const newBus = writeBus(bus, 2, 1);

    expect(readBuz(newBus, 2)).toBe(1);
  });

  it("should read two bytes from buss", () => {
    const bus = initializeBus();

    bus.ram[0] = 0xff;
    bus.ram[1] = 0x00;

    expect(read2BytesFromBuss(bus, 0)).toBe(0x00ff);
  });
});
