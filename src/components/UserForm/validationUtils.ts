/**
 * Calculate a person's age in years.
 *
 * @param {Date} birth The birth date of the person.
 * @returns {number} The age in years of the person
 */
const calculateAge = (birth: Date) => {
  if (birth > new Date()) {
    throw new Error("Birth date cannot be in the future");
  }

  if (isNaN(birth.getTime())) {
    throw new Error("Invalid date format");
  }

  const dateDiff = new Date(Date.now() - birth.getTime());
  const age = Math.abs(dateDiff.getUTCFullYear() - 1970);

  return age;
};

/**
 * Checks if the age of a person is greater than a specified minimum age.
 *
 * @param {Date} birth - The date of birth of the person to calculate the age from
 * @param {number} minAge - The minimum age to compare against.
 * @returns {boolean} Returns true if the person's age is greater than or equal to the minimum age, otherwise returns false.
 */
const ageIsGreatherThan = (birth: Date, minAge: number) => {
  const age = calculateAge(birth);
  if (age < minAge) {
    return false;
  }
  return true;
};

/**
 * Checks if a given string is a valid zip code.
 * @param {string} zipCode - The zip code to validate.
 * @returns {boolean} True if the zip code is valid, false otherwise.
 */
const isValidZipCode = (zipCode: string) => {
  return zipCode.length === 5 && /^\d{5}$/.test(zipCode);
};

/**
 * Checks if the given email is valid.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} A boolean indicating whether the email is valid or not.
 */
const isValidEmail = (email: string) => {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
};

/**
 * Checks if a string has no special characters.
 *
 * @param {string} value - The string to be checked.
 * @returns {boolean} A boolean indicating whether the string has no special characters.
 */
const hasNoSpecialCharacters = (value: string) => {
  return /^[a-zàâäéèêëîïôöûüùç' -]+$/i.test(value);
};

export {
  ageIsGreatherThan,
  calculateAge,
  hasNoSpecialCharacters,
  isValidEmail,
  isValidZipCode,
};
