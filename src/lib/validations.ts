import * as z from "zod"

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'adresse e-mail est requise" })
    .email({ message: "Format d'adresse e-mail invalide" }),
})

export const passwordSchema = z.object({
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Le code OTP doit contenir 6 caractères" })
    .max(6, { message: "Le code OTP doit contenir 6 caractères" })
    .regex(/^\d+$/, { message: "Le code OTP doit contenir uniquement des chiffres" }),
})
