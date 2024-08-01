import {
  ageIsGreatherThan,
  calculateAge,
  hasNoSpecialCharacters,
  isValidEmail,
  isValidZipCode,
} from "./validationUtils";

let people20years: Date;
beforeEach(() => {
  const date = new Date();
  people20years = new Date(date.setFullYear(date.getFullYear() - 20));
});

/**
 * @function calculateAge
 */
describe("calculateAge Unit Test Suites", () => {
  it("should return a correct age", () => {
    expect(calculateAge(people20years)).toEqual(20);
  });

  it("should throw an error if the birth date is in the future", () => {
    const date = new Date();
    const futureDate = new Date(date.setFullYear(date.getFullYear() + 1));
    expect(() => calculateAge(futureDate)).toThrow(
      "Birth date cannot be in the future"
    );
  });

  it("should throw an error if the birth date is in the wrong format", () => {
    expect(() => calculateAge(new Date("2021-13-01"))).toThrow(
      "Invalid date format"
    );
  });
});

/**
 * @function ageIsGreatherThan
 */
describe("ageIsGreatherThan Unit Test Suites", () => {
  it("should return true if the age is greater than the minimum age", () => {
    expect(ageIsGreatherThan(people20years, 18)).toBeTruthy();
  });

  it("should return false if the age is less than the minimum age", () => {
    expect(ageIsGreatherThan(people20years, 21)).toBeFalsy();
  });
});

/**
 * @function isValidZipCode
 */
describe("isValidZipCode Unit Test Suites", () => {
  it("should return true if the zip code is valid", () => {
    expect(isValidZipCode("75000")).toBeTruthy();
  });

  it("should return false if the zip code is invalid", () => {
    expect(isValidZipCode("7500")).toBeFalsy();
  });
});

/**
 * @function isValidEmail
 */
describe("isValidEmail Unit Test Suites", () => {
  it("should return true if the email is valid", () => {
    expect(isValidEmail("johndoe@example.com")).toBeTruthy();
  });

  it("should return false if the email is invalid", () => {
    expect(isValidEmail("johndoe@example")).toBeFalsy();
  });
});

/**
 * @function hasNoSpecialCharacters
 */
describe("hasNoSpecialCharacters Unit Test Suites", () => {
  it("should return true if the string has no special characters", () => {
    expect(hasNoSpecialCharacters("JohnDoe")).toBeTruthy();
  });

  it("should return false if the string has special characters", () => {
    expect(hasNoSpecialCharacters("JohnDoé@")).toBeFalsy();
  });
});
