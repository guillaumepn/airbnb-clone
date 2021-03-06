import * as yup from 'yup';

export const emailNotLongEnough = "email must be at least 3 characters";
export const invalidEmail = "email must be a valid email";
export const passwordNotLongEnough = "password must be at least 3 characters";

export const registerPasswordValidation = yup
    .string()
    .required()
    .min(3, passwordNotLongEnough)
    .max(255);

export const validUserSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .min(3, emailNotLongEnough)
        .max(255)
        .email(invalidEmail),
    password: registerPasswordValidation
});
