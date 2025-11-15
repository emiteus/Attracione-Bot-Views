"use client"

import { useState, useRef } from "react"
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload?: (file: File) => Promise<void>
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile)
      setStatus("idle")
    } else {
      setStatus("error")
      setMessage("Formato de arquivo inválido. Use CSV ou XLSX.")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile)
      setStatus("idle")
    } else {
      setStatus("error")
      setMessage("Formato de arquivo inválido. Use CSV ou XLSX.")
    }
  }

  const isValidFile = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]
    return validTypes.includes(file.type) || file.name.endsWith(".csv") || file.name.endsWith(".xlsx")
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setStatus("idle")
    
    try {
      if (onUpload) {
        await onUpload(file)
      }
      setStatus("success")
      setMessage("Planilha enviada com sucesso!")
      setTimeout(() => {
        onClose()
        resetModal()
      }, 2000)
    } catch (error) {
      setStatus("error")
      setMessage("Erro ao enviar planilha. Tente novamente.")
    } finally {
      setIsUploading(false)
    }
  }

  const resetModal = () => {
    setFile(null)
    setStatus("idle")
    setMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    if (!isUploading) {
      onClose()
      resetModal()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Upload de Planilha</h2>
            <p className="text-sm text-muted-foreground">
              Envie uma planilha CSV ou XLSX com os dados da competição
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isUploading}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
              isDragging && "border-primary bg-primary/5",
              !isDragging && "border-muted hover:border-primary/50 hover:bg-muted/50",
              file && "border-primary bg-primary/5"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-4 text-center">
              {file ? (
                <>
                  <div className="p-4 rounded-full bg-primary/10">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      resetModal()
                    }}
                  >
                    Escolher outro arquivo
                  </Button>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Arraste e solte seu arquivo aqui
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ou clique para selecionar
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: CSV, XLSX
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Formato esperado */}
          <div className="space-y-2 p-4 rounded-lg bg-muted/50">
            <h4 className="text-sm font-medium">Formato esperado:</h4>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Coluna 1: Nome do participante</li>
              <li>Coluna 2: Rede social (TikTok, Instagram, YouTube, Kwai)</li>
              <li>Coluna 3: Username</li>
              <li>Coluna 4: Views totais</li>
            </ul>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Enviar Planilha
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
