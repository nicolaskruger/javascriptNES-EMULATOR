import { Bus } from "./bus/bus";
import { Cpu } from "./cpu/cpu";

type NES = {
  bus: Bus;
  cpu: Cpu;
};

export type { NES };
