"use client"

import { User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RankingItem {
  id: string
  position: number
  name: string
  avatar?: string
  views: number
  variation: number
}

interface RankingVerticalProps {
  items: RankingItem[]
  maxViews?: number
}

// Função de formatação consistente para evitar hydration mismatch
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function RankingVertical({ items, maxViews }: RankingVerticalProps) {
  const max = maxViews || Math.max(...items.map(item => item.views))

  const getBarWidth = (views: number) => {
    return (views / max) * 100
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "p-4 transition-all hover:shadow-md",
            item.position === 1 && "ring-2 ring-yellow-400 dark:ring-yellow-600"
          )}
        >
          <div className="flex items-center gap-4">
            {/* Posição */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold",
                item.position === 1 && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-lg",
                item.position === 2 && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                item.position === 3 && "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                item.position > 3 && "bg-muted text-muted-foreground"
              )}
            >
              {item.position}
            </div>

            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted overflow-hidden">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-semibold truncate">{item.name}</h4>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold">{formatNumber(item.views)}</span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      item.variation > 0 && "text-green-600 dark:text-green-400",
                      item.variation < 0 && "text-red-600 dark:text-red-400",
                      item.variation === 0 && "text-muted-foreground"
                    )}
                  >
                    {item.variation > 0 && "↑"}
                    {item.variation < 0 && "↓"}
                    {Math.abs(item.variation)}%
                  </span>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    item.position === 1 && "bg-gradient-to-r from-yellow-400 to-yellow-600",
                    item.position === 2 && "bg-gradient-to-r from-gray-400 to-gray-600",
                    item.position === 3 && "bg-gradient-to-r from-orange-400 to-orange-600",
                    item.position > 3 && "bg-primary"
                  )}
                  style={{ width: `${getBarWidth(item.views)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
