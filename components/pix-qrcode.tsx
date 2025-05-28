"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface PixQRCodeProps {
  amount: number
  orderNumber: string
}

export function PixQRCode({ amount, orderNumber }: PixQRCodeProps) {
  const [countdown, setCountdown] = useState(10)
  const [pixCode] = useState(
    `00020126580014BR.GOV.BCB.PIX013636401234-5678-9012-3456-789012345678520400005303986540${amount.toFixed(2)}5802BR5925TECHSTORE ELETRONICOS6009SAO PAULO62070503***6304`,
  )
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Simular pagamento aprovado e redirecionar
          toast.success("Pagamento PIX confirmado!")
          router.push(`/pedido-confirmado?order=${orderNumber}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [orderNumber, router])

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    toast.success("Código PIX copiado!")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Pagamento PIX</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{formatPrice(amount)}</p>
            <p className="text-sm text-muted-foreground">Pedido #{orderNumber}</p>
          </div>

          {/* QR Code Realista */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg p-2">
              <div className="w-full h-full relative">
                {/* QR Code Pattern */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Positioning squares (corners) */}
                  <rect x="0" y="0" width="20" height="20" fill="black" />
                  <rect x="2" y="2" width="16" height="16" fill="white" />
                  <rect x="6" y="6" width="8" height="8" fill="black" />

                  <rect x="80" y="0" width="20" height="20" fill="black" />
                  <rect x="82" y="2" width="16" height="16" fill="white" />
                  <rect x="86" y="6" width="8" height="8" fill="black" />

                  <rect x="0" y="80" width="20" height="20" fill="black" />
                  <rect x="2" y="82" width="16" height="16" fill="white" />
                  <rect x="6" y="86" width="8" height="8" fill="black" />

                  {/* Timing patterns */}
                  {Array.from({ length: 10 }, (_, i) => (
                    <rect
                      key={`h-${i}`}
                      x={24 + i * 4}
                      y="6"
                      width="2"
                      height="2"
                      fill={i % 2 === 0 ? "black" : "white"}
                    />
                  ))}
                  {Array.from({ length: 10 }, (_, i) => (
                    <rect
                      key={`v-${i}`}
                      x="6"
                      y={24 + i * 4}
                      width="2"
                      height="2"
                      fill={i % 2 === 0 ? "black" : "white"}
                    />
                  ))}

                  {/* Data modules (random pattern) */}
                  {Array.from({ length: 400 }, (_, i) => {
                    const x = (i % 20) * 4 + 24
                    const y = Math.floor(i / 20) * 4 + 24
                    const isBlack = Math.random() > 0.5
                    if (x < 76 && y < 76) {
                      return <rect key={i} x={x} y={y} width="2" height="2" fill={isBlack ? "black" : "white"} />
                    }
                    return null
                  })}

                  {/* Alignment pattern */}
                  <rect x="40" y="40" width="20" height="20" fill="black" />
                  <rect x="42" y="42" width="16" height="16" fill="white" />
                  <rect x="46" y="46" width="8" height="8" fill="black" />
                  <rect x="48" y="48" width="4" height="4" fill="white" />
                  <rect x="49" y="49" width="2" height="2" fill="black" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">Escaneie o QR Code ou copie o código PIX</p>

            <div className="bg-muted p-3 rounded text-xs break-all">{pixCode}</div>

            <Button onClick={copyPixCode} className="w-full" variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copiar Código PIX
            </Button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Aguardando pagamento... {countdown}s</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Redirecionamento automático após confirmação</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
