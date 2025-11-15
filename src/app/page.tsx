"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { StatCard } from "@/components/stat-card"
import { ChartPlaceholder } from "@/components/chart-placeholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"

const rankingData = [
  { position: 1, name: "João Silva", views: 1250000, trend: 12.5, isPositive: true },
  { position: 2, name: "Maria Santos", views: 980000, trend: 8.3, isPositive: true },
  { position: 3, name: "Pedro Costa", views: 875000, trend: -2.1, isPositive: false },
  { position: 4, name: "Ana Oliveira", views: 720000, trend: 15.7, isPositive: true },
  { position: 5, name: "Carlos Souza", views: 650000, trend: 5.2, isPositive: true },
]

// Função de formatação consistente para evitar hydration mismatch
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Topbar 
          title="Dashboard" 
          action={
            <Select defaultValue="comp-atual">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione a competição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comp-atual">Competição Atual</SelectItem>
                <SelectItem value="comp-jan">Janeiro 2024</SelectItem>
                <SelectItem value="comp-dez">Dezembro 2023</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <div className="p-6 space-y-6">
          {/* Total de Views */}
          <StatCard
            title="Total de Views - Competição Atual"
            value="4.5M"
            icon={Eye}
            description="Competição Janeiro 2024"
            trend={{ value: 18.2, isPositive: true }}
          />

          {/* Ranking e Gráfico */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ranking de Participantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rankingData.map((participant) => (
                    <div
                      key={participant.position}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {participant.position}
                        </div>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(participant.views)} views
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

            {/* Gráfico */}
            <ChartPlaceholder title="Views por Dia" />
          </div>

          {/* Última Atualização */}
          <div className="flex justify-end">
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
