"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { EmailStep } from "./register/email-step"
import { PasswordStep } from "./register/password-step"
import { DetailsStep } from "./register/details-step"
import { useRegisterForms } from "@/hooks/auth/use-register-forms"
import toast from "react-hot-toast"
import { useEffect } from "react"

export function RegisterForm() {
  const {
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
  } = useRegisterForms()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error, clearError])

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs value={currentStep} className="w-full">
        <TabsContent value="email" className="mt-0">
          <EmailStep form={emailForm} onSubmit={handleEmailSubmit} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="password" className="mt-0">
          <PasswordStep
            form={passwordForm}
            email={email}
            isPasswordVisible={isPasswordVisible}
            isConfirmPasswordVisible={isConfirmPasswordVisible}
            isLoading={isLoading}
            onSubmit={handlePasswordSubmit}
            onTogglePasswordVisibility={togglePasswordVisibility}
            onToggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
            onBackToEmail={() => setCurrentStep("email")}
          />
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          <DetailsStep
            form={detailsForm}
            email={email}
            isLoading={isLoading}
            onSubmit={handleDetailsSubmit}
            onBackToPassword={() => setCurrentStep("password")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
