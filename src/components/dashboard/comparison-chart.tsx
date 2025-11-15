"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CompetitionData {
  name: string
  color: string
  data: { date: string; views: number }[]
}

interface ComparisonChartProps {
  competitions: CompetitionData[]
  title?: string
  className?: string
}

export function ComparisonChart({ 
  competitions, 
  title = "Comparativo de Competições",
  className 
}: ComparisonChartProps) {
  if (competitions.length === 0 || competitions.every(c => c.data.length === 0)) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            Nenhum dado disponível
          </div>
        </CardContent>
      </Card>
    )
  }

  // Encontrar valores máximo e mínimo entre todas as competições
  const allViews = competitions.flatMap(c => c.data.map(d => d.views))
  const maxViews = Math.max(...allViews)
  const minViews = Math.min(...allViews)
  const range = maxViews - minViews || 1

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short"
    }).format(date)
  }

  const getYPosition = (views: number) => {
    return 100 - ((views - minViews) / range) * 100
  }

  // Criar pontos para cada competição
  const competitionPoints = competitions.map(competition => {
    const maxLength = Math.max(...competitions.map(c => c.data.length))
    return {
      ...competition,
      points: competition.data.map((point, index) => ({
        x: (index / (maxLength - 1)) * 100,
        y: getYPosition(point.views),
        views: point.views,
        date: point.date
      }))
    }
  })

  const createSmoothPath = (points: any[]) => {
    if (points.length < 2) return ""
    
    let path = `M ${points[0].x} ${points[0].y}`
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      const controlX = (current.x + next.x) / 2
      
      path += ` Q ${controlX} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`
      path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`
    }
    
    return path
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legenda */}
          <div className="flex flex-wrap gap-4">
            {competitions.map((competition, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: competition.color }}
                />
                <span className="text-sm font-medium">{competition.name}</span>
              </div>
            ))}
          </div>

          {/* Gráfico */}
          <div className="relative h-[300px] w-full">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* Grid horizontal */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  className="stroke-muted"
                  strokeWidth="0.2"
                  strokeDasharray="2,2"
                />
              ))}

              {/* Linhas de cada competição */}
              {competitionPoints.map((competition, compIndex) => (
                <g key={compIndex}>
                  {/* Área sob a linha */}
                  <defs>
                    <linearGradient id={`gradient-${compIndex}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={competition.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={competition.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {competition.points.length > 1 && (
                    <path
                      d={`${createSmoothPath(competition.points)} L 100 100 L 0 100 Z`}
                      fill={`url(#gradient-${compIndex})`}
                    />
                  )}

                  {/* Linha principal */}
                  {competition.points.length > 1 && (
                    <path
                      d={createSmoothPath(competition.points)}
                      fill="none"
                      stroke={competition.color}
                      strokeWidth="0.5"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Pontos */}
                  {competition.points.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="1"
                        fill={competition.color}
                        className="stroke-background"
                        strokeWidth="0.5"
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        className="fill-transparent hover:fill-primary/20 cursor-pointer transition-colors"
                      >
                        <title>{`${competition.name} - ${formatDate(point.date)}: ${formatNumber(point.views)} views`}</title>
                      </circle>
                    </g>
                  ))}
                </g>
              ))}
            </svg>

            {/* Labels do eixo Y */}
            <div className="absolute inset-y-0 -left-12 flex flex-col justify-between text-xs text-muted-foreground">
              <span>{formatNumber(maxViews)}</span>
              <span>{formatNumber(minViews + range * 0.75)}</span>
              <span>{formatNumber(minViews + range * 0.5)}</span>
              <span>{formatNumber(minViews + range * 0.25)}</span>
              <span>{formatNumber(minViews)}</span>
            </div>
          </div>

          {/* Labels do eixo X */}
          {competitions[0] && (
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              {competitions[0].data
                .filter((_, i) => i % Math.ceil(competitions[0].data.length / 5) === 0)
                .map((point, index) => (
                  <span key={index}>{formatDate(point.date)}</span>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
