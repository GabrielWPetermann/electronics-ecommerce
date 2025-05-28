"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function TrocasEDevolucoes() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    orderNumber: "",
    productName: "",
    reason: "",
    description: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simular processamento
    toast.success("Solicitação enviada com sucesso!", {
      description: "Você receberá um e-mail com as instruções em até 24 horas.",
    })

    setIsModalOpen(false)
    setFormData({
      orderNumber: "",
      productName: "",
      reason: "",
      description: "",
      email: "",
      phone: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Trocas e Devoluções</h1>
            <p className="text-muted-foreground">Política de trocas e devoluções da TechStore</p>
          </div>

          <div className="grid gap-6">
            {/* Prazo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Prazo para Trocas e Devoluções
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Você tem até <strong>30 dias</strong> após o recebimento do produto para solicitar troca ou devolução.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Produtos eletrônicos: 30 dias</li>
                  <li>Eletrodomésticos: 30 dias</li>
                  <li>Produtos com defeito: 90 dias (garantia legal)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Condições */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Condições para Troca/Devolução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Produto em perfeito estado, sem sinais de uso</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Embalagem original preservada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Todos os acessórios e manuais inclusos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Nota fiscal do produto</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Como solicitar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Como Solicitar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Acesse Meus Pedidos</h4>
                      <p className="text-muted-foreground">Entre na sua conta e vá para a seção "Meus Pedidos"</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Selecione o Produto</h4>
                      <p className="text-muted-foreground">Encontre o pedido e clique em "Solicitar Troca/Devolução"</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Preencha o Formulário</h4>
                      <p className="text-muted-foreground">Informe o motivo e aguarde a aprovação</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Envio do Produto</h4>
                      <p className="text-muted-foreground">Enviaremos uma etiqueta de postagem gratuita</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Importante */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Informações Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• O reembolso será processado em até 5 dias úteis após recebermos o produto</li>
                  <li>• Produtos personalizados não podem ser trocados ou devolvidos</li>
                  <li>• O frete de devolução é gratuito quando o produto apresenta defeito</li>
                  <li>• Para trocas por arrependimento, o frete fica por conta do cliente</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" onClick={() => setIsModalOpen(true)}>
                Solicitar Troca/Devolução
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Solicitação */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Troca/Devolução</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="orderNumber">Número do Pedido *</Label>
              <Input
                id="orderNumber"
                required
                placeholder="Ex: TXK8H9P2L"
                value={formData.orderNumber}
                onChange={(e) => handleInputChange("orderNumber", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="productName">Nome do Produto *</Label>
              <Input
                id="productName"
                required
                placeholder="Ex: Teclado Mecânico RGB"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="reason">Motivo *</Label>
              <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defeito">Produto com defeito</SelectItem>
                  <SelectItem value="arrependimento">Arrependimento da compra</SelectItem>
                  <SelectItem value="diferente">Produto diferente do anunciado</SelectItem>
                  <SelectItem value="danificado">Produto danificado na entrega</SelectItem>
                  <SelectItem value="outro">Outro motivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descrição do Problema</Label>
              <Textarea
                id="description"
                placeholder="Descreva detalhadamente o problema..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">E-mail para Contato *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Enviar Solicitação
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
