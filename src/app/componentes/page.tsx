"use client"

import { useState } from "react"
import { 
  Eye, 
  TrendingUp, 
  Users, 
  Video,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  KpiCard,
  ParticipantsTable,
  RankingVertical,
  VideoList,
  EvolutionChart,
  ComparisonChart,
  BarChart,
  ParticipantProfileCard,
  UploadModal,
  DarkModeToggle
} from "@/components/dashboard"

export default function ComponentsShowcase() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Dados mockados para demonstração
  const kpiData = {
    totalViews: "2.543.890",
    participants: 24,
    videos: 156,
    avgGrowth: "+12.5%"
  }

  const participantsData = [
    {
      id: "1",
      position: 1,
      name: "Maria Silva",
      socials: ["tiktok", "instagram", "youtube"] as const,
      totalViews: 543890,
      dailyGrowth: 12500
    },
    {
      id: "2",
      position: 2,
      name: "João Santos",
      socials: ["tiktok", "instagram"] as const,
      totalViews: 432100,
      dailyGrowth: 8900
    },
    {
      id: "3",
      position: 3,
      name: "Ana Costa",
      socials: ["youtube", "kwai"] as const,
      totalViews: 389450,
      dailyGrowth: -2300
    },
    {
      id: "4",
      position: 4,
      name: "Pedro Oliveira",
      socials: ["tiktok"] as const,
      totalViews: 298760,
      dailyGrowth: 5600
    }
  ]

  const rankingData = [
    {
      id: "1",
      position: 1,
      name: "Maria Silva",
      views: 543890,
      variation: 12.5
    },
    {
      id: "2",
      position: 2,
      name: "João Santos",
      views: 432100,
      variation: 8.2
    },
    {
      id: "3",
      position: 3,
      name: "Ana Costa",
      views: 389450,
      variation: -2.1
    }
  ]

  const videosData = [
    {
      id: "1",
      title: "Vídeo de Apresentação - Competição 2024",
      views: 45890,
      publishedAt: "2024-01-15",
      growthSinceYesterday: 2340
    },
    {
      id: "2",
      title: "Tutorial Completo",
      views: 38920,
      publishedAt: "2024-01-14",
      growthSinceYesterday: 1890
    },
    {
      id: "3",
      title: "Bastidores da Gravação",
      views: 32100,
      publishedAt: "2024-01-13",
      growthSinceYesterday: -450
    }
  ]

  const evolutionData = [
    { date: "2024-01-10", views: 125000 },
    { date: "2024-01-11", views: 145000 },
    { date: "2024-01-12", views: 138000 },
    { date: "2024-01-13", views: 162000 },
    { date: "2024-01-14", views: 178000 },
    { date: "2024-01-15", views: 195000 },
    { date: "2024-01-16", views: 210000 }
  ]

  const comparisonData = [
    {
      name: "Competição Atual",
      color: "hsl(var(--primary))",
      data: [
        { date: "2024-01-10", views: 125000 },
        { date: "2024-01-11", views: 145000 },
        { date: "2024-01-12", views: 138000 },
        { date: "2024-01-13", views: 162000 },
        { date: "2024-01-14", views: 178000 }
      ]
    },
    {
      name: "Competição Anterior",
      color: "hsl(220, 70%, 50%)",
      data: [
        { date: "2024-01-10", views: 98000 },
        { date: "2024-01-11", views: 112000 },
        { date: "2024-01-12", views: 125000 },
        { date: "2024-01-13", views: 135000 },
        { date: "2024-01-14", views: 148000 }
      ]
    }
  ]

  const barChartData = [
    { name: "Maria Silva", value: 543890 },
    { name: "João Santos", value: 432100 },
    { name: "Ana Costa", value: 389450 },
    { name: "Pedro Oliveira", value: 298760 },
    { name: "Carla Souza", value: 256340 }
  ]

  const profileData = {
    name: "Maria Silva",
    socials: [
      { platform: "tiktok" as const, username: "mariasilva" },
      { platform: "instagram" as const, username: "maria.silva" },
      { platform: "youtube" as const, username: "MariaSilvaOficial" }
    ],
    totalViews: 543890,
    dailyAverage: 18129,
    videoCount: 28
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Biblioteca de Componentes</h1>
                <p className="text-sm text-muted-foreground">
                  Componentes modernos e minimalistas para o Dashboard Attracione
                </p>
              </div>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* KPI Cards */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">1. KPI Cards</h2>
            <p className="text-sm text-muted-foreground">
              Cards de métricas com suporte a ícones, badges e variações
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Total de Views"
              value={kpiData.totalViews}
              icon={Eye}
              badge={{
                value: "+3.400",
                trend: "up",
                label: "nas últimas 24h"
              }}
            />
            <KpiCard
              title="Participantes"
              value={kpiData.participants}
              icon={Users}
              subtitle="Ativos na competição"
            />
            <KpiCard
              title="Vídeos Publicados"
              value={kpiData.videos}
              icon={Video}
              badge={{
                value: "+8",
                trend: "up",
                label: "hoje"
              }}
            />
            <KpiCard
              title="Crescimento Médio"
              value={kpiData.avgGrowth}
              icon={TrendingUp}
              badge={{
                value: "2.1%",
                trend: "down",
                label: "vs. semana passada"
              }}
            />
          </div>
        </section>

        <Separator />

        {/* Participants Table */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">2. Tabela de Participantes</h2>
            <p className="text-sm text-muted-foreground">
              Tabela completa com posição, redes sociais e crescimento
            </p>
          </div>
          <ParticipantsTable
            participants={participantsData}
            onViewDetails={(id) => console.log("Ver detalhes:", id)}
          />
        </section>

        <Separator />

        {/* Ranking Vertical */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">3. Ranking Vertical</h2>
            <p className="text-sm text-muted-foreground">
              Ranking visual com barras proporcionais e destaque para o 1º lugar
            </p>
          </div>
          <div className="max-w-2xl">
            <RankingVertical items={rankingData} />
          </div>
        </section>

        <Separator />

        {/* Video List */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">4. Lista de Vídeos</h2>
            <p className="text-sm text-muted-foreground">
              Grid responsivo de vídeos com thumbnails e estatísticas
            </p>
          </div>
          <VideoList
            videos={videosData}
            onViewVideo={(id) => console.log("Ver vídeo:", id)}
          />
        </section>

        <Separator />

        {/* Evolution Chart */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">5. Gráfico de Evolução Diária</h2>
            <p className="text-sm text-muted-foreground">
              Line chart com linha suave e tooltips interativos
            </p>
          </div>
          <EvolutionChart data={evolutionData} />
        </section>

        <Separator />

        {/* Comparison Chart */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">6. Gráfico Comparativo</h2>
            <p className="text-sm text-muted-foreground">
              Comparação entre múltiplas competições com cores diferenciadas
            </p>
          </div>
          <ComparisonChart competitions={comparisonData} />
        </section>

        <Separator />

        {/* Bar Chart */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">7. Gráfico de Barras</h2>
            <p className="text-sm text-muted-foreground">
              Views por participante em formato vertical ou horizontal
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <BarChart data={barChartData} orientation="vertical" />
            <BarChart data={barChartData} orientation="horizontal" />
          </div>
        </section>

        <Separator />

        {/* Profile Card */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">8. Card de Perfil</h2>
            <p className="text-sm text-muted-foreground">
              Card completo com informações do participante e estatísticas
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <ParticipantProfileCard
              {...profileData}
              onViewVideos={() => console.log("Ver vídeos")}
            />
          </div>
        </section>

        <Separator />

        {/* Upload Modal */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">9. Modal de Upload</h2>
            <p className="text-sm text-muted-foreground">
              Modal para upload de planilhas com drag & drop
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setIsUploadModalOpen(true)}>
              Abrir Modal de Upload
            </Button>
          </div>
        </section>

        <Separator />

        {/* Dark Mode Toggle */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">10. Dark Mode Toggle</h2>
            <p className="text-sm text-muted-foreground">
              Botão para alternar entre modo claro e escuro
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <DarkModeToggle />
            <DarkModeToggle variant="outline" />
            <DarkModeToggle variant="default" size="default" />
          </div>
        </section>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={async (file) => {
          console.log("Upload:", file)
          // Simular upload
          await new Promise(resolve => setTimeout(resolve, 2000))
        }}
      />
    </div>
  )
}
