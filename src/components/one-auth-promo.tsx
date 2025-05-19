import { Button } from "@/components/ui/button"
import Image from "next/image"

export function OneAuthPromo() {
  return (
    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <Image
            src="nexcom-auth-illustration.svg"
            alt="Illustration Authentification NexCom"
            width={300}
            height={100}
            className="mx-auto"
            priority
          />
        </div>
        <h2 className="text-xl font-bold mb-4">Une seule connexion, tous vos services</h2>
        <p className="text-gray-600 mb-6">
          Accédez à l’ensemble des outils NexCom avec une authentification sécurisée, rapide et centralisée.
          Concentrez-vous sur l’essentiel, nous gérons la sécurité.
        </p>
        <Button variant="link" className="text-blue-500 hover:text-blue-600">
          En savoir plus sur l&apos;accès unifié
        </Button>

        <div className="mt-12 flex justify-center">
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
