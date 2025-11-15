"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { StatCard } from "@/components/stat-card"
import { ChartPlaceholder } from "@/components/chart-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Calendar, Users } from "lucide-react"
import { useParams } from "next/navigation"

const rankingData = [
  { position: 1, name: "João Silva", views: 1250000, trend: 12.5, isPositive: true },
  { position: 2, name: "Maria Santos", views: 980000, trend: 8.3, isPositive: true },
  { position: 3, name: "Pedro Costa", views: 875000, trend: -2.1, isPositive: false },
  { position: 4, name: "Ana Oliveira", views: 720000, trend: 15.7, isPositive: true },
  { position: 5, name: "Carlos Souza", views: 650000, trend: 5.2, isPositive: true },
]

export default function CompeticaoPage() {
  const params = useParams()
  const competitionName = "Competição Janeiro 2024" // Mock data

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Topbar title={competitionName} />

        <div className="p-6 space-y-6">
          {/* Informações da Competição */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{competitionName}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">01/01/2024 → 31/01/2024</span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  Ativa
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Cards de Estatísticas */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Views Totais"
              value="4.5M"
              icon={Eye}
              trend={{ value: 18.2, isPositive: true }}
            />
            <StatCard
              title="Participantes"
              value="6"
              icon={Users}
              description="Ativos na competição"
            />
            <StatCard
              title="Média por Participante"
              value="750K"
              icon={Eye}
              description="Views médias"
            />
          </div>

          {/* Gráficos */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartPlaceholder title="Views Diários da Competição" />
            <ChartPlaceholder title="Comparativo com Competições Anteriores" />
          </div>

          {/* Ranking Completo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ranking Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rankingData.map((participant) => (
                  <div
                    key={participant.position}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                        {participant.position}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {participant.views.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                    <div className={participant.isPositive ? "text-green-600" : "text-red-600"}>
                      <span className="text-sm font-medium">
                        {participant.isPositive ? "▲" : "▼"} {Math.abs(participant.trend)}%
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
