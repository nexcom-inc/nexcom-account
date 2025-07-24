"use client"

import { Button } from "@/components/ui/button"
import type { SocialLoginConfig } from "@/types/auth"

interface SocialLoginButtonProps {
  config: SocialLoginConfig
  onClick: () => void
}

export function SocialLoginButton({ config, onClick }: SocialLoginButtonProps) {
  const { name, icon: Icon, enabled, bgColor, textColor, hoverColor } = config

  return (
    <Button
      type="button"
      variant="outline"
      className={`
        w-full h-12 flex items-center justify-center gap-3 border border-gray-300 cursor-pointer
        ${enabled ? `${bgColor} ${textColor} ${hoverColor}` : "bg-gray-100 text-gray-400 cursor-not-allowed"}
        transition-colors duration-200
      `}
      onClick={onClick}
      disabled={!enabled}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">Continuer avec {name}</span>
      {!enabled && <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">Bientôt</span>}
    </Button>
  )
}
