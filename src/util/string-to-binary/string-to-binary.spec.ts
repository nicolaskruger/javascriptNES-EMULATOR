import { stringToBinary } from "./string-to-binary";

describe("string-to-binary", () => {
  it("should convert correctly", () => {
    expect(stringToBinary("1111")).toBe(0xf);
    expect(stringToBinary("1111-0000")).toBe(0xf0);
  });
});
