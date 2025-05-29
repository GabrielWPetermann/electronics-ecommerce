"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, MapPin, CreditCard, Calendar } from "lucide-react"
import Image from "next/image"

interface OrderItem {
  name: string
  image: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string
  status: "processando" | "em_transito" | "entregue" | "cancelado"
  total: number
  items: OrderItem[]
}

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

const statusMap = {
  processando: { label: "Processando", color: "bg-yellow-500" },
  em_transito: { label: "Em Trânsito", color: "bg-blue-500" },
  entregue: { label: "Entregue", color: "bg-green-500" },
  cancelado: { label: "Cancelado", color: "bg-red-500" },
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Detalhes do Pedido #{order.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status e Data */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Data do Pedido</p>
                <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
              </div>
            </div>
            <Badge className={`${statusMap[order.status].color} text-white`}>{statusMap[order.status].label}</Badge>
          </div>

          <Separator />

          {/* Endereço de Entrega */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-medium">Endereço de Entrega</p>
              <p className="text-sm text-muted-foreground">
                Rua das Flores, 123 - Apto 45
                <br />
                Jardim Paulista - São Paulo, SP
                <br />
                CEP: 01234-567
              </p>
            </div>
          </div>

          <Separator />

          {/* Forma de Pagamento */}
          <div className="flex items-start space-x-3">
            <CreditCard className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-medium">Forma de Pagamento</p>
              <p className="text-sm text-muted-foreground">Cartão de Crédito **** 1234</p>
              <p className="text-sm text-muted-foreground">Parcelado em 3x sem juros</p>
            </div>
          </div>

          <Separator />

          {/* Produtos */}
          <div>
            <h3 className="font-medium mb-4">Produtos ({order.items.length})</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                  </div>
                  <p className="font-bold">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Resumo do Pedido */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(order.total * 0.9)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete:</span>
              <span>{formatPrice(order.total * 0.1)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              Baixar Nota Fiscal
            </Button>
            {order.status === "entregue" && <Button className="flex-1">Avaliar Produtos</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
