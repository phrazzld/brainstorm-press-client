import { formatDateString } from "./time";

describe("formatDateString", () => {
  it("should format a date string to 'MMMM DD, YYYY'", () => {
    const date = new Date(2020, 0, 1, 12, 0, 0);
    expect(formatDateString(date)).toBe("January 1, 2020");
  });
});
