"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { UseFormReturn } from "react-hook-form"
import type { RegisterDetailsFormData } from "@/lib/validations/auth"

interface DetailsStepProps {
  form: UseFormReturn<RegisterDetailsFormData>
  email: string
  isLoading: boolean
  onSubmit: (data: RegisterDetailsFormData) => void
  onBackToPassword: () => void
}
// eslint-disable-next-line
export function DetailsStep({ form, email, isLoading, onSubmit, onBackToPassword }: DetailsStepProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Informations personnelles</h2>
          <p className="text-gray-600">Complétez votre profil</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input className="h-12" disabled={isLoading} placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input className="h-12" disabled={isLoading} placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone (optionnel)</FormLabel>
              <FormControl>
                <Input className="h-12" disabled={isLoading} placeholder="+33 6 12 34 56 78" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  J&apos;accepte les{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    conditions d&apos;utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    politique de confidentialité
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptMarketing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  Je souhaite recevoir des informations sur les produits et services Nexcom
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 bg-transparent"
            onClick={onBackToPassword}
            disabled={isLoading}
          >
            Retour
          </Button>
          <Button type="submit" className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? "Création du compte..." : "Créer le compte"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
