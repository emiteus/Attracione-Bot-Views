"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { StatCard } from "@/components/stat-card"
import { ChartPlaceholder } from "@/components/chart-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Video, TrendingUp, ExternalLink } from "lucide-react"
import { useParams } from "next/navigation"

const videosData = [
  {
    id: 1,
    title: "Vídeo 1",
    views: 450000,
    date: "2024-01-15",
    growth: 12.5,
    link: "https://tiktok.com/@user/video1",
  },
  {
    id: 2,
    title: "Vídeo 2",
    views: 380000,
    date: "2024-01-14",
    growth: 8.3,
    link: "https://tiktok.com/@user/video2",
  },
  {
    id: 3,
    title: "Vídeo 3",
    views: 320000,
    date: "2024-01-13",
    growth: -2.1,
    link: "https://tiktok.com/@user/video3",
  },
  {
    id: 4,
    title: "Vídeo 4",
    views: 100000,
    date: "2024-01-12",
    growth: 15.7,
    link: "https://tiktok.com/@user/video4",
  },
]

export default function ParticipantePage() {
  const params = useParams()
  const participantName = "João Silva" // Mock data

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Topbar title={participantName} />

        <div className="p-6 space-y-6">
          {/* Header com Avatar e Redes */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl font-semibold">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{participantName}</h2>
                  <div className="flex gap-3 text-2xl">
                    <span title="TikTok">🎵</span>
                    <span title="Instagram">📷</span>
                    <span title="YouTube">▶️</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cards de Estatísticas */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Views Totais"
              value="1.25M"
              icon={Eye}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Vídeos Publicados"
              value="4"
              icon={Video}
              description="Na competição atual"
            />
            <StatCard
              title="Média de Views"
              value="312.5K"
              icon={TrendingUp}
              description="Por vídeo"
            />
          </div>

          {/* Gráfico de Evolução */}
          <ChartPlaceholder title="Evolução Diária de Views" height="h-[250px]" />

          {/* Lista de Vídeos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vídeos da Competição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {videosData.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail Placeholder */}
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                        <Video className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{video.title}</p>
                          <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                            <a href={video.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span>{video.views.toLocaleString()} views</span>
                          <span>•</span>
                          <span>{new Date(video.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>

                    <div className={video.growth >= 0 ? "text-green-600" : "text-red-600"}>
                      <span className="text-sm font-medium">
                        {video.growth >= 0 ? "▲" : "▼"} {Math.abs(video.growth)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
