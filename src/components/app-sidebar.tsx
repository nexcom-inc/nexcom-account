"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from "@/components/ui/sidebar"


import {
  BookOpen,
  BrainCog,
  CreditCard,
  Grip,
  Settings2,
  ShieldCheck,
  UserCircle,
  Users
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Mon compte",
      url: "#",
      icon: UserCircle,
      isActive: true,
      items: [
        {
          title: "Profil",
          url: "#",
        },
        {
          title: "Sécurité",
          url: "#",
        },
        {
          title: "Sessions",
          url: "#",
        },
      ],
    },
    {
      title: "Services NexCom",
      url: "#",
      icon: Grip,
      items: [
        {
          title: "Messenger",
          url: "#",
        },
        {
          title: "Invoice",
          url: "#",
        },
        {
          title: "Pay",
          url: "#",
        },
        {
          title: "RH",
          url: "#",
        },
      ],
    },
    {
      title: "Facturation",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Abonnement",
          url: "#",
        },
        {
          title: "Historique des paiements",
          url: "#",
        },
        {
          title: "Moyens de paiement",
          url: "#",
        },
      ],
    },
    {
      title: "Équipe",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Membres",
          url: "#",
        },
        {
          title: "Invitations",
          url: "#",
        },
        {
          title: "Rôles & Permissions",
          url: "#",
        },
      ],
    },
    {
      title: "Sécurité avancée",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "Authentification 2FA",
          url: "#",
        },
        {
          title: "Appareils autorisés",
          url: "#",
        },
        {
          title: "Token API",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Commencer",
          url: "#",
        },
        {
          title: "API & Intégrations",
          url: "#",
        },
        {
          title: "Support technique",
          url: "#",
        },
      ],
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Préférences",
          url: "#",
        },
        {
          title: "Langue",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <div className="flex items-center gap-2 p-2">
      <BrainCog className="size-6 " />
      <p className="font-bold text-2xl">Nexcom</p>
      </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
