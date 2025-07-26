"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  registerEmailSchema,
  registerPasswordSchema,
  registerDetailsSchema,
  type RegisterEmailFormData,
  type RegisterPasswordFormData,
  type RegisterDetailsFormData,
} from "@/lib/validations/auth"

type RegisterStep = "email" | "password" | "details"

export function useRegisterForms() {
  const [currentStep, setCurrentStep] = useState<RegisterStep>("email")
  const [email, setEmail] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Forms
  const emailForm = useForm<RegisterEmailFormData>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const passwordForm = useForm<RegisterPasswordFormData>({
    resolver: zodResolver(registerPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const detailsForm = useForm<RegisterDetailsFormData>({
    resolver: zodResolver(registerDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      acceptTerms: false,
      acceptMarketing: false,
    },
  })

  // Handlers
  const handleEmailSubmit = async (data: RegisterEmailFormData) => {
    setIsLoading(true)
    setError(null)

    try {
    //   // Check if email already exists
    //   const response = await fetch("/api/auth/check-email", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: data.email }),
    //   })

    //   if (!response.ok) {
    //     const errorData = await response.json()
    //     throw new Error(errorData.message || "Erreur lors de la vérification de l'email")
    //   }

    //   const result = await response.json()

    //   if (result.exists) {
    //     setError("Cette adresse e-mail est déjà utilisée")
    //     return
    //   }

      setEmail(data.email)
      setCurrentStep("password")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (data: RegisterPasswordFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate password strength
      if (data.password !== data.confirmPassword) {
        setError("Les mots de passe ne correspondent pas")
        return
      }

      setCurrentStep("details")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDetailsSubmit = async (data: RegisterDetailsFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const registerData = {
        email,
        password: passwordForm.getValues("password"),
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        acceptTerms: data.acceptTerms,
        acceptMarketing: data.acceptMarketing,
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erreur lors de la création du compte")
      }

      // Registration successful - redirect or show success message
      window.location.href = "/auth/verify-email"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  // Actions
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const clearError = () => {
    setError(null)
  }

  return {
    // State
    currentStep,
    email,
    isPasswordVisible,
    isConfirmPasswordVisible,
    error,
    isLoading,
    // Forms
    emailForm,
    passwordForm,
    detailsForm,
    // Handlers
    handleEmailSubmit,
    handlePasswordSubmit,
    handleDetailsSubmit,
    // Actions
    setCurrentStep,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    clearError,
  }
}
