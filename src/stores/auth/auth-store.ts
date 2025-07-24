import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authAPI } from "@/lib/api/auth"
import type { AuthCredentials, UserData, ApiError } from "@/types/auth"

interface AuthState {
  user: UserData | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  hasCheckedAuth: boolean,

  // Actions
  login: (credentials: AuthCredentials) => Promise<any>
  loginWithOtp: (email: string, otp: string) => Promise<any>
  register: (userData: UserData) => Promise<any>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  updateUser: (userData: Partial<UserData>) => void
  setLoading: (loading?: boolean) => void
  setError: (error: string) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasCheckedAuth: false,

      setLoading: (loading = true) => set({ isLoading: loading }),

      setError: (error: string) => set({ error }),

      clearError: () => set({ error: null }),

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null })
          const { data } = await authAPI.login(credentials)
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          })
          return data
        } catch (error: any) {
          const apiError = error.response?.data as ApiError
          const errorMessage = apiError?.message || apiError?.details?.message || "Erreur de connexion"
          set({ error: errorMessage, isLoading: false })
          throw error
        }
      },

      loginWithOtp: async (email: string, otp: string) => {
        try {
          set({ isLoading: true, error: null })
          const { data } = await authAPI.verifyOtp(email, otp)
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          })
          return data
        } catch (error: any) {
          const apiError = error.response?.data as ApiError
          const errorMessage = apiError?.message || apiError?.details?.message || "Code OTP invalide"
          set({ error: errorMessage, isLoading: false })
          throw error
        }
      },

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null })
          const { data } = await authAPI.register(userData)
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          })
          return data
        } catch (error: any) {
          const apiError = error.response?.data as ApiError
          const errorMessage = apiError?.message || apiError?.details?.message || "Erreur d'inscription"
          set({ error: errorMessage, isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await authAPI.logout()
        } catch (error) {
          console.error("Erreur lors de la déconnexion:", error)
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true })
          const { data } = await authAPI.getProfile()
          set({
            hasCheckedAuth: true,
            user: data as unknown as UserData,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            hasCheckedAuth: true,
          })
        }
      },

      updateUser: (userData) =>
        set((state) => ({
          user: {
            ...state.user!,
            ...userData,
          } as UserData,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCheckedAuth: state.hasCheckedAuth,
      }),
    },
  ),
)
