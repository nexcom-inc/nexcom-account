"use client"

import { useAuthStore } from "@/stores/auth/auth-store"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useOAuthRedirect() {
  const searchParams = useSearchParams()
  const { checkAuth } = useAuthStore()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const redirect = searchParams.get("redirect")
    const next = searchParams.get("next")
    const oauthError = searchParams.get("error")
    

    // Gérer les erreurs OAuth
    if (oauthError) {
      setError(`Erreur d'authentification: ${oauthError}`)
      return
    }

    if (redirect === "true") {
      setIsRedirecting(true)

      // Délai minimum pour éviter un flash trop rapide
      const minDelay = new Promise((resolve) => setTimeout(resolve, 2000))

      Promise.all([checkAuth(), minDelay])
        .then(() => {
          if (next) {
            window.location.href = next
          } else {
            window.location.href = "/home"
          }
        })
        .catch((authError) => {
          console.error("Échec de la vérification d'authentification après OAuth:", authError)
          setError("Échec de la vérification d'authentification")
          setIsRedirecting(false)
        })
    }
  }, [searchParams, checkAuth])

  return {
    isRedirecting,
    error,
    clearError: () => setError(null),
  }
}
