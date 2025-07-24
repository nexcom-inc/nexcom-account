import { GitHubIcon, GoogleIcon } from "@/components/icons/socials";
import type { SocialLoginConfig } from "@/types/auth";

// Activer les providers puisque le backend est prêt
export const socialProviders: SocialLoginConfig[] = [
  {
    provider: "google",
    name: "Google",
    icon: GoogleIcon,
    enabled: true, // Activé maintenant
    bgColor: "bg-white",
    textColor: "text-gray-700",
    hoverColor: "hover:bg-black",
  },
  {
    provider: "github",
    name: "GitHub",
    icon: GitHubIcon,
    enabled: false, // Désactivé jusqu'à ce que vous ayez le endpoint GitHub
    bgColor: "bg-gray-900",
    textColor: "text-white",
    hoverColor: "hover:bg-gray-800",
  },
];
