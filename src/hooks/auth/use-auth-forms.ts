"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"
import { useAuthStore } from "@/stores/auth/auth-store"
import { useLoginStore } from "@/stores/auth/login-store"
import { authAPI } from "@/lib/api/auth"
import {
  emailSchema,
  passwordSchema,
  otpSchema,
  type EmailFormData,
  type PasswordFormData,
  type OtpFormData,
} from "@/lib/validations/auth"

export function useAuthForms() {
  const router = useRouter()
  const next = useSearchParams().get("next")
  const [resendTimer, setResendTimer] = useState(0)

  const { login, loginWithOtp, error, isLoading, clearError } = useAuthStore()
  const { currentStep, email, isPasswordVisible, setCurrentStep, setEmail, togglePasswordVisibility } = useLoginStore()

  // Forms
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  })

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  // Handlers
  const handleEmailSubmit = useCallback(
    async (data: EmailFormData) => {
      clearError()
      setEmail(data.email)
      setCurrentStep("password")
    },
    [setEmail, setCurrentStep, clearError],
  )

  const handlePasswordSubmit = useCallback(
    async (data: PasswordFormData) => {
      try {
        clearError()
        await login({ email, password: data.password })
        window.location.href = next || "/home"
      } catch (error) {
        console.log("Login error:", error)
      }
    },
    [email, login, router, next, clearError],
  )

  const handleOtpSubmit = useCallback(
    async (data: OtpFormData) => {
      try {
        clearError()
        await loginWithOtp(email, data.otp)
        router.push(next || "/home")
      } catch (error) {
        console.log("OTP verification error:", error)
      }
    },
    [email, loginWithOtp, router, next, clearError],
  )

  const handleSendOtp = useCallback(async () => {
    try {
      clearError()
      await authAPI.sendOtp(email)
      setCurrentStep("otp")

      // Start countdown timer
      let time = 60
      setResendTimer(time)
      const timer = setInterval(() => {
        time -= 1
        setResendTimer(time)
        if (time <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    } catch (error) {
      console.log("Send OTP error:", error)
    }
  }, [email, setCurrentStep, clearError])

  const handleResendOtp = useCallback(async () => {
    if (resendTimer > 0) return
    await handleSendOtp()
  }, [resendTimer, handleSendOtp])

  return {
    // State
    currentStep,
    email,
    isPasswordVisible,
    resendTimer,
    error,
    isLoading,

    // Forms
    emailForm,
    passwordForm,
    otpForm,

    // Handlers
    handleEmailSubmit,
    handlePasswordSubmit,
    handleOtpSubmit,
    handleSendOtp,
    handleResendOtp,

    // Actions
    setCurrentStep,
    togglePasswordVisibility,
    clearError,
  }
}
