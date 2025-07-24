"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { UseFormReturn } from "react-hook-form"
import type { EmailFormData } from "@/lib/validations/auth"
import { SocialLoginSection } from "./social-login-section"

interface EmailStepProps {
  form: UseFormReturn<EmailFormData>
  onSubmit: (data: EmailFormData) => void
  isLoading: boolean
}

export function EmailStep({ form, onSubmit, isLoading }: EmailStepProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Adresse e-mail ou numéro mobile" className="h-12" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
          {isLoading ? "Chargement..." : "Suivant"}
        </Button>
<SocialLoginSection />
        <div className="mt-8 text-sm text-gray-600">
          Vous n&apos;avez pas de compte Nexcom ?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            S&apos;inscrire maintenant
          </a>
        </div>
      </form>
    </Form>
  )
}
