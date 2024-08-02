import { z } from "zod";
import {
  ageIsGreatherThan,
  hasNoSpecialCharacters,
  isValidEmail,
  isValidZipCode,
} from "../../lib/validationUtils";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "Required")
    .refine(
      (value) => hasNoSpecialCharacters(value),
      "Invalid first name format"
    ),
  lastName: z
    .string()
    .min(1, "Required")
    .refine(
      (value) => hasNoSpecialCharacters(value),
      "Invalid last name format"
    ),
  email: z
    .string()
    .min(1, "Required")
    .refine((value) => isValidEmail(value), "Invalid email format"),
  birthDate: z
    .string()
    .refine(
      (value) => ageIsGreatherThan(new Date(value), 18),
      "Invalid birth date,you must have at least 18 years old"
    ),
  city: z
    .string()
    .min(1, "Required")
    .refine((value) => hasNoSpecialCharacters(value), "Invalid city format"),
  zipCode: z
    .string()
    .min(1, "Required")
    .refine(
      (value) => isValidZipCode(value),
      "Invalid zip code format expected 5 digits"
    ),
});
