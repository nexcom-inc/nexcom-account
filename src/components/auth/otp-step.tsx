"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type { OtpFormData } from "@/lib/validations/auth"

interface OtpStepProps {
  form: UseFormReturn<OtpFormData>
  email: string
  resendTimer: number
  isLoading: boolean
  onSubmit: (data: OtpFormData) => void
  onBackToEmail: () => void
  onBackToPassword: () => void
  onResendOtp: () => void
}

export function OtpStep({
  form,
  email,
  resendTimer,
  isLoading,
  onSubmit,
  onBackToEmail,
  onBackToPassword,
  onResendOtp,
}: OtpStepProps) {
  return (
    <>
      <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center gap-2 mb-6">
        <div className="bg-green-500 rounded-full p-1">
          <Check size={16} className="text-white" />
        </div>
        <span>OTP envoyé à {email}</span>
      </div>

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
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className={`w-8 h-1 rounded-full ${
                              field.value.length >= i ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Input
                        type="text"
                        className="h-12"
                        maxLength={6}
                        inputMode="numeric"
                        placeholder="Entrez le code à 6 chiffres"
                        disabled={isLoading}
                        {...field}
                      />
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
              onClick={onBackToPassword}
              disabled={isLoading}
            >
              Se connecter à l&apos;aide du mot de passe
            </button>
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline disabled:text-gray-400 disabled:no-underline"
              disabled={resendTimer > 0 || isLoading}
              onClick={onResendOtp}
            >
              {resendTimer > 0 ? `Renvoyer dans ${resendTimer}s` : "Renvoyer"}
            </button>
          </div>

          <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? "Vérification..." : "Vérifier"}
          </Button>
        </form>
      </Form>
    </>
  )
}
