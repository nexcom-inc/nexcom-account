import { LoaderCircle } from "lucide-react"
import Image from "next/image"

interface OAuthLoadingProps {
  provider?: string
}

export function OAuthLoading({ provider }: OAuthLoadingProps) {
  return (
    <div className="min-h-screen bg-[url('/auth-background.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mb-6">
            <Image src="/nexcom-black.svg" alt="Nexcom Logo" width={140} height={40} className="mx-auto" priority />
          </div>

          <div className="flex flex-col items-center space-y-6">
            <LoaderCircle className="animate-spin text-gray-600 w-10 h-10" />

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Connexion en cours...</h2>
              <p className="text-gray-600">
                {provider
                  ? `Finalisation de votre authentification ${provider}`
                  : "Finalisation de votre authentification"}
              </p>
            </div>

            <div className="text-xs text-gray-500 max-w-sm">
              <p>Vous allez être redirigé automatiquement. Si cela prend trop de temps, actualisez la page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
