import type { AuthCredentials, AuthResponse, UserData, ApiError, SocialProvider } from "@/types/auth"

class AuthAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: "include",
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw {
          response: {
            data: data as ApiError,
          },
        }
      }

      return { data }
    } catch (error) {
      throw error
    }
  }

  async login(credentials: AuthCredentials): Promise<{ data: AuthResponse }> {
    return this.request<AuthResponse>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async register(userData: UserData): Promise<{ data: AuthResponse }> {
    return this.request<AuthResponse>("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<void> {
    await this.request("/logout", {
      method: "POST",
    })
  }

  async getProfile(): Promise<{ data: { user: UserData } }> {
    return this.request<{ user: UserData }>("/me")
  }

  async sendOtp(email: string): Promise<void> {
    await this.request("/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async verifyOtp(email: string, otp: string): Promise<{ data: AuthResponse }> {
    return this.request<AuthResponse>("/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    })
  }

   // Social login methods
  getSocialLoginUrl(provider: SocialProvider): string {
    return `${this.baseUrl}/${provider}/login`
  }

  redirectToSocialLogin(provider: SocialProvider): void {
    const url = this.getSocialLoginUrl(provider)
    window.location.href = url
  }
}

export const authAPI = new AuthAPI()
