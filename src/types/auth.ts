export interface AuthCredentials {
  email: string
  password: string
}

export interface UserData {
  id: string
  email: string
  name?: string
  // Ajoutez d'autres propriétés selon vos besoins
}

export interface AuthResponse {
  user: UserData
  token?: string
}

export interface ApiError {
  statusCode: number
  message: string
  details?: {
    message: string
    statusCode: number
  }
}

export type LoginStep = "initial" | "password" | "otp"

export type SocialProvider = "google" | "github"

export interface SocialLoginConfig {
  provider: SocialProvider
  name: string
  icon: React.ComponentType<any>
  enabled: boolean
  bgColor: string
  textColor: string
  hoverColor: string
}
