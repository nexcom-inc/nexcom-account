"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/lib/nexcom/auth/auth-context"
import { useLoginStore } from "@/lib/store"
import { emailSchema, otpSchema, passwordSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"

export function LoginForm() {
  const { currentStep, email, isPasswordVisible, setCurrentStep, setEmail, togglePasswordVisibility } = useLoginStore()
  const [resendTimer, setResendTimer] = useState(51)
  const { login } = useAuth();
  const router = useRouter()


  // Email form
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: email,
    },
  })

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  })

  // OTP form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const onEmailSubmit = (data: z.infer<typeof emailSchema>) => {
    setEmail(data.email)
    setCurrentStep("password")
  }

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    console.log("Password submitted:", data)
    try {
      await login(email, data.password);
      router.push("/")
    } catch (error) {
      console.log("Login error:", error);
   } 
  }

  const onOtpSubmit = (data: z.infer<typeof otpSchema>) => {
    console.log("OTP submitted:", data)
    // Implement actual OTP verification logic here
  }

  const handleSendOtp = () => {
    setCurrentStep("otp")
    // Start countdown timer for resend
    let time = 51
    const timer = setInterval(() => {
      time -= 1
      setResendTimer(time)
      if (time <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  return (
    <Tabs value={currentStep} className="w-full">
      <TabsContent value="initial" className="mt-0">
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Adresse e-mail ou numéro mobile" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              Suivant
            </Button>
          </form>
        </Form>
{/* 
        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-4">Se connecter à l&apos;aide de</p>
          <div className="flex flex-wrap gap-2"></div>
        </div> */}

        <div className="mt-8 text-sm text-gray-600">
          Vous n&apos;avez pas de compte Nexcom ?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            S&apos;inscrire maintenant
          </a>
        </div>
      </TabsContent>

      <TabsContent value="password" className="mt-0">
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{email}</span>
                <button type="button" className="text-blue-500 text-sm" onClick={() => setCurrentStep("initial")}>
                  Modifier
                </button>
              </div>
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input type={isPasswordVisible ? "text" : "password"} className="h-12 pr-10" {...field} />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          onClick={togglePasswordVisibility}
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
              <button type="button" className="text-blue-500 text-sm" onClick={handleSendOtp}>
                Se connecter par OTP email
              </button>
              <button type="button" className="text-blue-500 text-sm">
                Mot de passe oublié ?
              </button>
            </div>
            <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              Se connecter
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="otp" className="mt-0">
        <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center gap-2 mb-6">
          <div className="bg-green-500 rounded-full p-1">
            <Check size={16} className="text-white" />
          </div>
          <span>OTP envoyé à t***m@mouhame*******.te**</span>
        </div>

        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{email}</span>
                <button type="button" className="text-blue-500 text-sm" onClick={() => setCurrentStep("initial")}>
                  Modifier
                </button>
              </div>
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <div className="flex gap-2 mb-4">
                          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div
                              key={i}
                              className={`w-8 h-1 rounded-full ${i === 1 ? "bg-blue-500" : "bg-gray-300"}`}
                            ></div>
                          ))}
                        </div>
                        <Input type="text" className="h-12" maxLength={6} inputMode="numeric" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <button type="button" className="text-blue-500 text-sm" onClick={() => setCurrentStep("password")}>
                Se connecter à l&apos;aide du mot de passe
              </button>
              <button type="button" className="text-blue-500 text-sm" disabled={resendTimer > 0}>
                {resendTimer > 0 ? `Renvoyer dans ${resendTimer}s` : "Renvoyer"}
              </button>
            </div>
            <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              Vérifier
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}
