import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function SmartLoginButton() {
  return (
    <Button
      variant="default"
      className="bg-blue-800 hover:bg-blue-900 text-white flex items-center gap-2 rounded-full px-4 py-2"
    >
      <Sparkles size={16} className="text-yellow-300" />
      <span>Essayer la connexion intelligente</span>
    </Button>
  )
}
