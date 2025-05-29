"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, MapPin, CheckCircle, Clock } from "lucide-react"

interface TrackingModalProps {
  orderId: string
  isOpen: boolean
  onClose: () => void
}

const trackingSteps = [
  {
    id: 1,
    title: "Pedido Confirmado",
    description: "Seu pedido foi confirmado e está sendo preparado",
    date: "15/01/2024 - 14:30",
    completed: true,
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Produto Separado",
    description: "Produto foi separado e embalado para envio",
    date: "16/01/2024 - 09:15",
    completed: true,
    icon: Package,
  },
  {
    id: 3,
    title: "Saiu para Entrega",
    description: "Produto saiu da transportadora e está a caminho",
    date: "17/01/2024 - 08:00",
    completed: true,
    icon: Truck,
  },
  {
    id: 4,
    title: "Em Rota de Entrega",
    description: "Produto está na rota de entrega local",
    date: "Previsão: 18/01/2024",
    completed: false,
    icon: MapPin,
  },
]

export function TrackingModal({ orderId, isOpen, onClose }: TrackingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Rastrear Pedido #{orderId}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Código de Rastreamento */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Código de Rastreamento</p>
            <p className="text-lg font-mono">BR123456789TechStore</p>
            <Button variant="outline" size="sm" className="mt-2">
              Copiar Código
            </Button>
          </div>

          <Separator />

          {/* Status Atual */}
          <div className="text-center">
            <Badge className="bg-blue-500 text-white mb-2">Em Trânsito</Badge>
            <p className="text-sm text-muted-foreground">
              Previsão de entrega: <strong>18/01/2024</strong>
            </p>
          </div>

          <Separator />

          {/* Timeline de Rastreamento */}
          <div className="space-y-4">
            <h3 className="font-medium">Histórico de Rastreamento</h3>
            <div className="space-y-4">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-2 rounded-full ${
                          step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`w-px h-8 mt-2 ${step.completed ? "bg-green-200" : "bg-gray-200"}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center space-x-2">
                        <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.title}
                        </p>
                        {!step.completed && <Clock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Ações */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Rastrear nos Correios
            </Button>
            <Button variant="outline" className="w-full">
              Entrar em Contato
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
