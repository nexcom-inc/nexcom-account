import { create } from "zustand"

type LoginStep = "initial" | "password" | "otp"

interface LoginState {
  currentStep: LoginStep
  email: string
  isPasswordVisible: boolean
  otpSent: boolean
  setCurrentStep: (step: LoginStep) => void
  setEmail: (email: string) => void
  togglePasswordVisibility: () => void
  setOtpSent: (sent: boolean) => void
}

export const useLoginStore = create<LoginState>((set) => ({
  currentStep: "initial",
  email: "team@mouhamedlamotte.tech",
  isPasswordVisible: false,
  otpSent: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  setEmail: (email) => set({ email }),
  togglePasswordVisibility: () => set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
  setOtpSent: (sent) => set({ otpSent: sent }),
}))
