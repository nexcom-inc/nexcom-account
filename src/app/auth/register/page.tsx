"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { OneAuthPromo } from "@/components/one-auth-promo"
import { OAuthLoading } from "@/components/auth/oauth-loading"
import Image from "next/image"
import { useOAuthRedirect } from "@/hooks/auth/use-oauth-redirect"

export default function NexcomRegister() {
  const { isRedirecting } = useOAuthRedirect()

  // État de chargement pendant la redirection OAuth
  if (isRedirecting) {
    return <OAuthLoading />
  }

  return (
    <div className="min-h-screen bg-[url('/auth-background.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row lg:divide-x-2 divide-gray-200">
          <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col items-start">
            <div className="mb-8">
              <Image
                src="/nexcom-black.svg"
                alt="Nexcom Logo"
                width={140}
                height={40}
                className="mb-6 fill-black stroke-black"
                priority
              />
            </div>
            <RegisterForm />
          </div>

          {/* Right side - OneAuth promo */}
          <OneAuthPromo />
        </div>
      </div>
    </div>
  )
}
