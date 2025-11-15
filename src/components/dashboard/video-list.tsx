"use client"

import { Play, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Video {
  id: string
  thumbnail?: string
  title: string
  views: number
  publishedAt: string
  growthSinceYesterday: number
  url?: string
}

interface VideoListProps {
  videos: Video[]
  onViewVideo?: (id: string) => void
}

export function VideoList({ videos, onViewVideo }: VideoListProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden transition-all hover:shadow-lg">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted overflow-hidden group">
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            
            {/* Overlay com botão */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Button
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onViewVideo?.(video.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Ver vídeo
              </Button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">
              {video.title}
            </h3>

            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-lg">{formatNumber(video.views)}</span>
              <span className="text-muted-foreground">{formatDate(video.publishedAt)}</span>
            </div>

            {/* Badge de crescimento */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  video.growthSinceYesterday > 0 && "text-green-600 dark:text-green-400",
                  video.growthSinceYesterday < 0 && "text-red-600 dark:text-red-400",
                  video.growthSinceYesterday === 0 && "text-muted-foreground"
                )}
              >
                {video.growthSinceYesterday > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : video.growthSinceYesterday < 0 ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                <span>
                  {video.growthSinceYesterday > 0 && "+"}
                  {formatNumber(video.growthSinceYesterday)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">desde ontem</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
