import { z } from "zod";
import {
  ageIsGreatherThan,
  hasNoSpecialCharacters,
  isValidEmail,
  isValidZipCode,
} from "./validationUtils";

export const formSchema = z.object({
  firstName: z
    .string()
    .refine(
      (value) => hasNoSpecialCharacters(value),
      "Invalid first name format"
    ),
  lastName: z
    .string()
    .refine(
      (value) => hasNoSpecialCharacters(value),
      "Invalid last name format"
    ),
  email: z
    .string()
    .refine((value) => isValidEmail(value), "Invalid email format"),
  birthDate: z
    .string()
    .min(1)
    .refine(
      (value) => ageIsGreatherThan(new Date(value), 18),
      "Invalid birth date,you must have at least 18 years old"
    ),
  city: z
    .string()
    .refine((value) => hasNoSpecialCharacters(value), "Invalid city format"),
  zipCode: z
    .string()
    .refine(
      (value) => isValidZipCode(value),
      "Invalid zip code format expected 5 digits"
    ),
});
