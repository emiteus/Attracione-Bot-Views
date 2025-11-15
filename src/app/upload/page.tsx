"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload as UploadIcon, FileSpreadsheet } from "lucide-react"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Topbar title="Upload de Planilha" />

        <div className="p-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Enviar Planilha de Dados</CardTitle>
              <CardDescription className="text-base">
                Faça upload de um arquivo CSV ou XLSX com os dados da competição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Área de Upload */}
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors hover:border-primary hover:bg-accent/50">
                <UploadIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-2">
                  Clique para selecionar ou arraste o arquivo aqui
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Formatos aceitos: CSV, XLSX (máx. 10MB)
                </p>
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" asChild>
                    <span>Selecionar arquivo</span>
                  </Button>
                </label>
              </div>

              {/* Formato Esperado */}
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2 text-sm">Formato esperado da planilha:</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• <strong>Nome do Participante</strong> - Nome completo</p>
                  <p>• <strong>TikTok</strong> - Link do perfil (opcional)</p>
                  <p>• <strong>Instagram</strong> - Link do perfil (opcional)</p>
                  <p>• <strong>YouTube</strong> - Link do perfil (opcional)</p>
                  <p>• <strong>Kwai</strong> - Link do perfil (opcional)</p>
                  <p>• <strong>Link do Vídeo</strong> - URL completa</p>
                  <p>• <strong>Views</strong> - Número de visualizações</p>
                  <p>• <strong>Data</strong> - Data de publicação (DD/MM/AAAA)</p>
                </div>
              </div>

              {/* Botão de Envio */}
              <Button className="w-full" size="lg">
                <UploadIcon className="mr-2 h-4 w-4" />
                Enviar Planilha
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
