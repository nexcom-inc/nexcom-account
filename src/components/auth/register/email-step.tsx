"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { UseFormReturn } from "react-hook-form"
import type { RegisterEmailFormData } from "@/lib/validations/auth"
import { SocialLoginSection } from "../social-login-section"
import { useSearchParams } from "next/navigation"

interface EmailStepProps {
  form: UseFormReturn<RegisterEmailFormData>
  onSubmit: (data: RegisterEmailFormData) => void
  isLoading: boolean
}

export function EmailStep({ form, onSubmit, isLoading }: EmailStepProps) {

  const next = useSearchParams().get("next")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Créer un compte</h2>
          <p className="text-gray-600">Commencez par saisir votre adresse e-mail</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Adresse e-mail" className="h-12" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
          {isLoading ? "Vérification..." : "Suivant"}
        </Button>

        <SocialLoginSection  />

        <div className="mt-8 text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <a href={`/auth/login${next ? `?next=${next}` : ""}`} className="text-blue-500 hover:underline">
            Se connecter
          </a>
        </div>
      </form>
    </Form>
  )
}
