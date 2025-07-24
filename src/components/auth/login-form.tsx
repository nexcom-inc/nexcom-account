"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EmailStep } from "./email-step";
import { PasswordStep } from "./password-step";
import { OtpStep } from "./otp-step";
import { useAuthForms } from "@/hooks/auth/use-auth-forms";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function LoginForm() {
  const {
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
  } = useAuthForms();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [currentStep, clearError]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs value={currentStep} className="w-full">
        <TabsContent value="initial" className="mt-0">
          <EmailStep
            form={emailForm}
            onSubmit={handleEmailSubmit}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="password" className="mt-0">
          <PasswordStep
            form={passwordForm}
            email={email}
            isPasswordVisible={isPasswordVisible}
            isLoading={isLoading}
            onSubmit={handlePasswordSubmit}
            onTogglePasswordVisibility={togglePasswordVisibility}
            onBackToEmail={() => setCurrentStep("initial")}
            onSendOtp={handleSendOtp}
          />
        </TabsContent>

        <TabsContent value="otp" className="mt-0">
          <OtpStep
            form={otpForm}
            email={email}
            resendTimer={resendTimer}
            isLoading={isLoading}
            onSubmit={handleOtpSubmit}
            onBackToEmail={() => setCurrentStep("initial")}
            onBackToPassword={() => setCurrentStep("password")}
            onResendOtp={handleResendOtp}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
