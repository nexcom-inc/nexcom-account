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


// Register schemas
export const registerEmailSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
})



export const registerPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export const registerDetailsSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
  acceptMarketing: z.boolean().optional(),
})

// Type exports
export type EmailFormData = z.infer<typeof emailSchema>
export type PasswordFormData = z.infer<typeof passwordSchema>
export type OtpFormData = z.infer<typeof otpSchema>
export type RegisterEmailFormData = z.infer<typeof registerEmailSchema>
export type RegisterPasswordFormData = z.infer<typeof registerPasswordSchema>
export type RegisterDetailsFormData = z.infer<typeof registerDetailsSchema>