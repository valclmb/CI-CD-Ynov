import { calculateAge } from "./validationUtils";

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
