"use client"

import { useSocialAuth } from "@/hooks/auth/use-social-auth"
import { SocialLoginButton } from "./social-login-button"
import { socialProviders } from "@/lib/config/auth/social-providers"

// Supprimer la dépendance au store d'auth pour isLoading

export function SocialLoginSection() {
  const { handleSocialLogin } = useSocialAuth()

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {socialProviders.map((provider) => (
          <SocialLoginButton
            key={provider.provider}
            config={provider}
            onClick={() => handleSocialLogin(provider.provider)}
          />
        ))}
      </div>

      {socialProviders.some((p) => !p.enabled) && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Certaines connexions sociales seront bientôt disponibles</p>
        </div>
      )}
    </div>
  )
}
