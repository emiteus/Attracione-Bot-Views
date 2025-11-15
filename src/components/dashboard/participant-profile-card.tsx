"use client"

import { User, Instagram, Youtube, Music2, Video } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ParticipantProfileCardProps {
  name: string
  avatar?: string
  socials: {
    platform: "tiktok" | "instagram" | "youtube" | "kwai"
    username: string
  }[]
  totalViews: number
  dailyAverage: number
  videoCount: number
  onViewVideos?: () => void
  className?: string
}

const SocialIcon = ({ platform }: { platform: string }) => {
  const iconClass = "h-5 w-5"
  
  switch (platform) {
    case "tiktok":
      return <Music2 className={iconClass} />
    case "instagram":
      return <Instagram className={iconClass} />
    case "youtube":
      return <Youtube className={iconClass} />
    case "kwai":
      return <Music2 className={iconClass} />
    default:
      return null
  }
}

export function ParticipantProfileCard({
  name,
  avatar,
  socials,
  totalViews,
  dailyAverage,
  videoCount,
  onViewVideos,
  className
}: ParticipantProfileCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5 pb-8">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted overflow-hidden ring-4 ring-background shadow-lg">
              {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Video className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>

          {/* Nome */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Redes Sociais */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Redes Sociais Conectadas</h3>
          <div className="grid gap-2">
            {socials.map((social, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="p-2 rounded-md bg-background">
                  <SocialIcon platform={social.platform} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium capitalize">{social.platform}</p>
                  <p className="text-xs text-muted-foreground truncate">@{social.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1 text-center">
            <p className="text-2xl font-bold">{formatNumber(totalViews)}</p>
            <p className="text-xs text-muted-foreground">Views Totais</p>
          </div>
          <div className="space-y-1 text-center border-x">
            <p className="text-2xl font-bold">{formatNumber(dailyAverage)}</p>
            <p className="text-xs text-muted-foreground">Média Diária</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-2xl font-bold">{videoCount}</p>
            <p className="text-xs text-muted-foreground">Vídeos</p>
          </div>
        </div>

        <Separator />

        {/* Botão de ação */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={onViewVideos}
        >
          <Video className="h-4 w-4 mr-2" />
          Ver Todos os Vídeos
        </Button>
      </CardContent>
    </Card>
  )
}
