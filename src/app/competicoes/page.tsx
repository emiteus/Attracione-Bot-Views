"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, Calendar } from "lucide-react"

const competitionsData = [
  {
    id: 1,
    name: "Competição Janeiro 2024",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    totalViews: 4500000,
    status: "active",
  },
  {
    id: 2,
    name: "Competição Dezembro 2023",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    totalViews: 3800000,
    status: "finished",
  },
  {
    id: 3,
    name: "Competição Novembro 2023",
    startDate: "2023-11-01",
    endDate: "2023-11-30",
    totalViews: 3200000,
    status: "finished",
  },
  {
    id: 4,
    name: "Competição Outubro 2023",
    startDate: "2023-10-01",
    endDate: "2023-10-31",
    totalViews: 2900000,
    status: "finished",
  },
]

export default function CompeticoesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Topbar title="Competições" />

        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competitionsData.map((competition) => (
              <Card key={competition.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Nome e Status */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{competition.name}</h3>
                        {competition.status === "active" && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                            Ativa
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Datas */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(competition.startDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                        {" → "}
                        {new Date(competition.endDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    {/* Views Totais */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {competition.totalViews.toLocaleString()} views totais
                      </span>
                    </div>

                    {/* Botão */}
                    <Link href={`/competicoes/${competition.id}`} className="block">
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
