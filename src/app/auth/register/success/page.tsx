"use client"

import { CheckCircle, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Compte créé avec succès !</CardTitle>
          <CardDescription className="text-gray-600">
            Nous avons envoyé un email de confirmation pour vérifier votre compte
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">Vérifiez votre email</p>
                <p className="text-sm text-blue-700">
                  Cliquez sur le lien de confirmation dans l'email que nous vous avons envoyé pour activer votre compte.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Vous n'avez pas reçu l'email ?</strong>
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Vérifiez votre dossier spam ou courriers indésirables</li>
              <li>Assurez-vous d'avoir saisi la bonne adresse email</li>
              <li>Patientez quelques minutes pour que l'email arrive</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/auth/login" className="block">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Besoin d'aide ?{" "}
              <Link href="/support" className="text-blue-600 hover:underline">
                Contacter le support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}