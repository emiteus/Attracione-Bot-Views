"use client"

import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  badge?: {
    value: string
    trend: "up" | "down" | "neutral"
    label?: string
  }
  className?: string
}

export function KpiCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  badge,
  className 
}: KpiCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        
        {badge && (
          <div className="flex items-center gap-2 pt-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
                badge.trend === "up" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                badge.trend === "down" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                badge.trend === "neutral" && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
              )}
            >
              {badge.trend === "up" && "▲"}
              {badge.trend === "down" && "▼"}
              {badge.trend === "neutral" && "●"}
              <span>{badge.value}</span>
            </span>
            {badge.label && (
              <span className="text-xs text-muted-foreground">{badge.label}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
