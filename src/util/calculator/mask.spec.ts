import { mask, mask16bit, mask8bit } from "./mask";

describe("mask", () => {
  it("should mask 4bits", () => {
    const maskedValue = mask(0xff, 4);

    expect(maskedValue).toBe(0xf);
  });

  it("should mask 8bits", () => {
    const maskedValue = mask8bit(0xfff);

    expect(maskedValue).toBe(0xff);
  });

  it("should mask 8bits", () => {
    const maskedValue = mask16bit(0xfffff);

    expect(maskedValue).toBe(0xffff);
  });
});
