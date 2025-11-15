"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DataPoint {
  date: string
  views: number
}

interface EvolutionChartProps {
  data: DataPoint[]
  title?: string
  className?: string
}

export function EvolutionChart({ data, title = "Evolução Diária", className }: EvolutionChartProps) {
  if (data.length === 0) {
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

  const maxViews = Math.max(...data.map(d => d.views))
  const minViews = Math.min(...data.map(d => d.views))
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

  // Criar pontos para a linha
  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: getYPosition(point.views),
    views: point.views,
    date: point.date
  }))

  // Criar path SVG com curva suave
  const createSmoothPath = () => {
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

              {/* Área sob a linha */}
              <defs>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.3" />
                  <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {points.length > 1 && (
                <path
                  d={`${createSmoothPath()} L 100 100 L 0 100 Z`}
                  fill="url(#areaGradient)"
                />
              )}

              {/* Linha principal */}
              {points.length > 1 && (
                <path
                  d={createSmoothPath()}
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              )}

              {/* Pontos */}
              {points.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="1"
                    className="fill-primary stroke-background"
                    strokeWidth="0.5"
                  />
                  {/* Tooltip invisível para hover */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    className="fill-transparent hover:fill-primary/20 cursor-pointer transition-colors"
                  >
                    <title>{`${formatDate(point.date)}: ${formatNumber(point.views)} views`}</title>
                  </circle>
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
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0).map((point, index) => (
              <span key={index}>{formatDate(point.date)}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
