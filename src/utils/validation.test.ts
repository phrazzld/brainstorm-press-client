import faker from "faker";
import { isValidEmail } from "./validation";

describe("valid emails", () => {
  const validEmails = [];
  for (let i = 0; i < 50; i++) {
    validEmails.push(faker.internet.email());
  }

  test("should return true for valid emails", () => {
    validEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });
});

describe("invalid emails", () => {
  const invalidEmails = ["test@", "@test.com", "test@test.com@test"];
  for (let i = 0; i < 50; i++) {
    invalidEmails.push(faker.random.word());
  }

  test("should return false for invalid emails", () => {
    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});
