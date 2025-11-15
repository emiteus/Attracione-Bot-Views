"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Eye } from "lucide-react"

const participantsData = [
  {
    id: 1,
    name: "João Silva",
    views: 1250000,
    socials: { tiktok: true, instagram: true, youtube: true, kwai: false },
  },
  {
    id: 2,
    name: "Maria Santos",
    views: 980000,
    socials: { tiktok: true, instagram: true, youtube: false, kwai: true },
  },
  {
    id: 3,
    name: "Pedro Costa",
    views: 875000,
    socials: { tiktok: true, instagram: false, youtube: true, kwai: true },
  },
  {
    id: 4,
    name: "Ana Oliveira",
    views: 720000,
    socials: { tiktok: true, instagram: true, youtube: true, kwai: true },
  },
  {
    id: 5,
    name: "Carlos Souza",
    views: 650000,
    socials: { tiktok: false, instagram: true, youtube: true, kwai: false },
  },
  {
    id: 6,
    name: "Juliana Lima",
    views: 580000,
    socials: { tiktok: true, instagram: true, youtube: false, kwai: true },
  },
]

const SocialIcon = ({ platform, active }: { platform: string; active: boolean }) => {
  const icons = {
    tiktok: "🎵",
    instagram: "📷",
    youtube: "▶️",
    kwai: "🎬",
  }

  return (
    <span
      className={`text-lg ${active ? "opacity-100" : "opacity-20"}`}
      title={platform}
    >
      {icons[platform as keyof typeof icons]}
    </span>
  )
}

export default function ParticipantesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Topbar title="Participantes" />

        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {participantsData.map((participant) => (
              <Card key={participant.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Avatar */}
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-xl font-semibold">
                        {participant.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* Nome */}
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{participant.name}</h3>
                    </div>

                    {/* Redes Sociais */}
                    <div className="flex gap-3">
                      <SocialIcon platform="tiktok" active={participant.socials.tiktok} />
                      <SocialIcon platform="instagram" active={participant.socials.instagram} />
                      <SocialIcon platform="youtube" active={participant.socials.youtube} />
                      <SocialIcon platform="kwai" active={participant.socials.kwai} />
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {participant.views.toLocaleString()} views
                      </span>
                    </div>

                    {/* Botão */}
                    <Link href={`/participantes/${participant.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Ver detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
