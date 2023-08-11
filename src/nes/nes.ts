import { Bus, initializeBus } from "./bus/bus";
import { Cpu, initializeCpu } from "./cpu/cpu";

type NES = {
  bus: Bus;
  cpu: Cpu;
};

const initializeNes = () =>
  ({ bus: initializeBus(), cpu: initializeCpu() } as NES);

export { initializeNes };

export type { NES };
