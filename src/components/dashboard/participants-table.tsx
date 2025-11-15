"use client"

import { Instagram, Youtube, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Participant {
  id: string
  position: number
  name: string
  socials: ("tiktok" | "instagram" | "youtube" | "kwai")[]
  totalViews: number
  dailyGrowth: number
}

interface ParticipantsTableProps {
  participants: Participant[]
  onViewDetails?: (id: string) => void
}

const SocialIcon = ({ platform }: { platform: string }) => {
  const iconClass = "h-4 w-4"
  
  switch (platform) {
    case "tiktok":
      return <Music2 className={iconClass} />
    case "instagram":
      return <Instagram className={iconClass} />
    case "youtube":
      return <Youtube className={iconClass} />
    case "kwai":
      return <Music2 className={iconClass} />
    default:
      return null
  }
}

export function ParticipantsTable({ participants, onViewDetails }: ParticipantsTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num)
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                #
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                Participante
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                Redes Sociais
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-sm">
                Views Totais
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-sm">
                Crescimento
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-sm">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr
                key={participant.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-4 align-middle">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm",
                      participant.position === 1 && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                      participant.position === 2 && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                      participant.position === 3 && "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                      participant.position > 3 && "bg-muted text-muted-foreground"
                    )}
                  >
                    {participant.position}
                  </div>
                </td>
                <td className="p-4 align-middle font-medium">
                  {participant.name}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex gap-2">
                    {participant.socials.map((social) => (
                      <div
                        key={social}
                        className="p-1.5 rounded-md bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
                      >
                        <SocialIcon platform={social} />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-4 align-middle text-right font-semibold">
                  {formatNumber(participant.totalViews)}
                </td>
                <td className="p-4 align-middle text-right">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-medium",
                      participant.dailyGrowth > 0 && "text-green-600 dark:text-green-400",
                      participant.dailyGrowth < 0 && "text-red-600 dark:text-red-400",
                      participant.dailyGrowth === 0 && "text-muted-foreground"
                    )}
                  >
                    {participant.dailyGrowth > 0 && "▲"}
                    {participant.dailyGrowth < 0 && "▼"}
                    {participant.dailyGrowth === 0 && "●"}
                    <span>{formatNumber(Math.abs(participant.dailyGrowth))}</span>
                  </span>
                </td>
                <td className="p-4 align-middle text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails?.(participant.id)}
                  >
                    Ver detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
