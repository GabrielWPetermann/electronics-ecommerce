"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home } from "lucide-react"

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")

  useEffect(() => {
    // Calcular data estimada de entrega (5-7 dias úteis)
    const today = new Date()
    const deliveryDate = new Date(today)
    deliveryDate.setDate(today.getDate() + 7)

    setEstimatedDelivery(
      deliveryDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Pedido Confirmado!</h1>
            <p className="text-muted-foreground">Obrigado pela sua compra. Seu pedido foi processado com sucesso.</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detalhes do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número do Pedido</p>
                  <p className="font-bold text-lg">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data do Pedido</p>
                  <p className="font-medium">{new Date().toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Entrega Estimada</p>
                <p className="font-medium">{estimatedDelivery}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Pedido Confirmado</p>
                    <p className="text-sm text-muted-foreground">Seu pedido foi recebido e está sendo processado</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Preparando para Envio</p>
                    <p className="text-sm text-muted-foreground">Seus produtos estão sendo separados</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Truck className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Em Trânsito</p>
                    <p className="text-sm text-muted-foreground">Você receberá o código de rastreamento</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Home className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Entregue</p>
                    <p className="text-sm text-muted-foreground">Produto entregue no endereço informado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Enviamos um e-mail de confirmação com todos os detalhes do seu pedido.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">Continuar Comprando</Button>
              </Link>
              <Link href="/meus-pedidos">
                <Button>Acompanhar Pedido</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
