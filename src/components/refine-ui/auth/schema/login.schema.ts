import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    remember: z.boolean(),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\\[\]{};':"\\|,.<>\\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    let errMessage = "";
    if (countOfLowerCase < 1) {
      errMessage = "String must contain Lower Case character";
    }
    if (countOfNumbers < 1) {
      errMessage = "String must contain Number character";
    }
    if (countOfUpperCase < 1) {
      errMessage = "String must contain Upper Case character";
    }
    if (countOfSpecialChar < 1) {
      errMessage = "String must contain Special character";
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: errMessage,
      });
    }
  });
