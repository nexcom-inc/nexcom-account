"use client"

import { useCallback } from "react"
import { authAPI } from "@/lib/api/auth"
import type { SocialProvider } from "@/types/auth"

// Simplifier le hook puisque pas besoin de gestion d'état complexe

export function useSocialAuth() {
  const handleSocialLogin = useCallback((provider: SocialProvider) => {
    try {
      // Simple redirection vers l'endpoint d'authentification
      authAPI.redirectToSocialLogin(provider)
    } catch (error) {
      console.error(`Erreur lors de la redirection ${provider}:`, error)
    }
  }, [])

  const getSocialLoginUrl = useCallback((provider: SocialProvider) => {
    return authAPI.getSocialLoginUrl(provider)
  }, [])

  return {
    handleSocialLogin,
    getSocialLoginUrl,
  }
}
