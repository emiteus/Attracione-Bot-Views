"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BarData {
  name: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarData[]
  title?: string
  orientation?: "vertical" | "horizontal"
  className?: string
}

export function BarChart({ 
  data, 
  title = "Views por Participante",
  orientation = "vertical",
  className 
}: BarChartProps) {
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

  const maxValue = Math.max(...data.map(d => d.value))

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getBarSize = (value: number) => {
    return (value / maxValue) * 100
  }

  const defaultColors = [
    "hsl(var(--primary))",
    "hsl(220, 70%, 50%)",
    "hsl(280, 70%, 50%)",
    "hsl(340, 70%, 50%)",
    "hsl(40, 70%, 50%)",
  ]

  if (orientation === "horizontal") {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium truncate max-w-[200px]">{item.name}</span>
                  <span className="font-bold text-muted-foreground">
                    {formatNumber(item.value)}
                  </span>
                </div>
                <div className="h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-500 flex items-center justify-end px-3"
                    style={{
                      width: `${getBarSize(item.value)}%`,
                      backgroundColor: item.color || defaultColors[index % defaultColors.length]
                    }}
                  >
                    <span className="text-xs font-medium text-white">
                      {getBarSize(item.value).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Vertical orientation
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Gráfico */}
          <div className="flex items-end justify-around gap-2 h-[300px] px-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
                {/* Valor */}
                <span className="text-xs font-bold text-muted-foreground">
                  {formatNumber(item.value)}
                </span>
                
                {/* Barra */}
                <div className="w-full flex flex-col items-center justify-end flex-1">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                    style={{
                      height: `${getBarSize(item.value)}%`,
                      backgroundColor: item.color || defaultColors[index % defaultColors.length]
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg">
                      {item.name}: {formatNumber(item.value)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="flex items-center justify-around gap-2 px-4">
            {data.map((item, index) => (
              <div key={index} className="flex-1 max-w-[100px] text-center">
                <span className="text-xs text-muted-foreground truncate block">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
