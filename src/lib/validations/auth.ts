import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
})

export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "Le code OTP doit contenir 6 chiffres")
    .max(6, "Le code OTP doit contenir 6 chiffres")
    .regex(/^\d+$/, "Le code OTP ne peut contenir que des chiffres"),
})

export type EmailFormData = z.infer<typeof emailSchema>
export type PasswordFormData = z.infer<typeof passwordSchema>
export type OtpFormData = z.infer<typeof otpSchema>
