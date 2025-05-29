"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Search, Eye, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useOrdersStore } from "@/lib/orders-store"
import { OrderDetailsModal } from "@/components/order-details-modal"
import { TrackingModal } from "@/components/tracking-modal"

const statusMap = {
  processando: { label: "Processando", color: "bg-yellow-500" },
  em_transito: { label: "Em Trânsito", color: "bg-blue-500" },
  entregue: { label: "Entregue", color: "bg-green-500" },
  cancelado: { label: "Cancelado", color: "bg-red-500" },
}

export default function MyOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { orders } = useOrdersStore()

  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<any>(null)
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<string>("")
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const filteredOrders = orders.filter((order) => order.id.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleViewDetails = (order: any) => {
    setSelectedOrderForDetails(order)
    setIsDetailsModalOpen(true)
  }

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrderForTracking(orderId)
    setIsTrackingModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por número do pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Tente buscar por outro número de pedido" : "Você ainda não fez nenhum pedido"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Realizado em {new Date(order.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${statusMap[order.status].color} text-white`}>
                          {statusMap[order.status].label}
                        </Badge>
                        <p className="text-lg font-bold mt-1">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantidade: {item.quantity} • {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          {order.status === "em_transito" && (
                            <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.id)}>
                              Rastrear Pedido
                            </Button>
                          )}
                        </div>

                        {order.status === "entregue" && <Button size="sm">Comprar Novamente</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <OrderDetailsModal
        order={selectedOrderForDetails}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      <TrackingModal
        orderId={selectedOrderForTracking}
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />
    </div>
  )
}
