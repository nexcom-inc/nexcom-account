"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type { PasswordFormData } from "@/lib/validations/auth"

interface PasswordStepProps {
  form: UseFormReturn<PasswordFormData>
  email: string
  isPasswordVisible: boolean
  isLoading: boolean
  onSubmit: (data: PasswordFormData) => void
  onTogglePasswordVisibility: () => void
  onBackToEmail: () => void
  onSendOtp: () => void
}

export function PasswordStep({
  form,
  email,
  isPasswordVisible,
  isLoading,
  onSubmit,
  onTogglePasswordVisibility,
  onBackToEmail,
  onSendOtp,
}: PasswordStepProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-900">{email}</span>
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline"
              onClick={onBackToEmail}
              disabled={isLoading}
            >
              Modifier
            </button>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      className="h-12 pr-10"
                      disabled={isLoading}
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
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="text-blue-500 text-sm hover:underline"
            onClick={onSendOtp}
            disabled={isLoading}
          >
            Se connecter par OTP email
          </button>
          <button type="button" className="text-blue-500 text-sm hover:underline" disabled={isLoading}>
            Mot de passe oublié ?
          </button>
        </div>

        <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  )
}
