"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const code = useSearchParams().get("code") ?? null

  useEffect(() => {
    if (!code) {
      router.push("/auth/login")
      return
    }

    const verifyEmail = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-email/${code}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          setIsVerified(true)
          setError(null)
        } else {
          const errorData = await response.json()
          setError(errorData.message || "Erreur lors de la vérification de l'email")
        }
      } catch (err) {
        setError("Erreur de connexion. Veuillez réessayer.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [code, router])

  const handleReturnToLogin = () => {
    router.push("/auth/login")
  }

  const handleResendVerification = () => {
    // Logique pour renvoyer l'email de vérification
    router.push("/auth/resend-verification")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              Vérification en cours...
            </CardTitle>
            <CardDescription>Nous vérifions votre adresse email</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Email vérifié avec succès !</CardTitle>
            <CardDescription>
              Votre adresse email a été confirmée. Vous pouvez maintenant vous connecter à votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleReturnToLogin} className="w-full">
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Erreur de vérification</CardTitle>
            <CardDescription className="text-red-600">{error}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={handleResendVerification} variant="outline" className="w-full bg-transparent">
              Renvoyer l'email de vérification
            </Button>
            <Button onClick={handleReturnToLogin} className="w-full">
              Retour à la connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

export default VerifyEmail
