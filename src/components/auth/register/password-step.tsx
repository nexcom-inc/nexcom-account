"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type { RegisterPasswordFormData } from "@/lib/validations/auth"

interface PasswordStepProps {
  form: UseFormReturn<RegisterPasswordFormData>
  email: string
  isPasswordVisible: boolean
  isConfirmPasswordVisible: boolean
  isLoading: boolean
  onSubmit: (data: RegisterPasswordFormData) => void
  onTogglePasswordVisibility: () => void
  onToggleConfirmPasswordVisibility: () => void
  onBackToEmail: () => void
}

export function PasswordStep({
  form,
  email,
  isPasswordVisible,
  isConfirmPasswordVisible,
  isLoading,
  onSubmit,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onBackToEmail,
}: PasswordStepProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Créer un mot de passe</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{email}</span>
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline"
              onClick={onBackToEmail}
              disabled={isLoading}
            >
              Modifier
            </button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    className="h-12 pr-10"
                    disabled={isLoading}
                    placeholder="Créer un mot de passe"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={onTogglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    className="h-12 pr-10"
                    disabled={isLoading}
                    placeholder="Confirmer le mot de passe"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={onToggleConfirmPasswordVisibility}
                    disabled={isLoading}
                  >
                    {isConfirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-xs text-gray-500 space-y-1">
          <p>Le mot de passe doit contenir :</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Au moins 8 caractères</li>
            <li>Une lettre majuscule et une minuscule</li>
            <li>Un chiffre</li>
            <li>Un caractère spécial</li>
          </ul>
        </div>

        <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
          {isLoading ? "Création..." : "Suivant"}
        </Button>
      </form>
    </Form>
  )
}
