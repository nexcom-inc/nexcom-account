import { AuthProvider } from "@/lib/nexcom/auth/auth-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
