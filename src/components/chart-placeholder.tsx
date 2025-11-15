import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartPlaceholderProps {
  title: string
  height?: string
}

export function ChartPlaceholder({ title, height = "h-[300px]" }: ChartPlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${height} flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/20`}>
          <p className="text-sm text-muted-foreground">Gráfico: {title}</p>
        </div>
      </CardContent>
    </Card>
  )
}
