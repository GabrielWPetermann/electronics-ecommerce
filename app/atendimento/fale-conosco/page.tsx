"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/ui/back-button"
import { Chatbot } from "@/components/chatbot"
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"

export default function FaleConoscoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Mensagem enviada com sucesso!", {
      description: "Retornaremos em até 24 horas.",
    })

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const openWhatsApp = () => {
    window.open("https://wa.me/5511999999999", "_blank")
  }

  const openEmail = () => {
    window.location.href = "mailto:contato@techstore.com"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Fale Conosco</h1>
            <p className="text-muted-foreground">Estamos aqui para ajudar você</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Canais de Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:bg-muted p-2 rounded"
                    onClick={openWhatsApp}
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:bg-muted p-2 rounded"
                    onClick={openEmail}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-sm text-muted-foreground">contato@techstore.com</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:bg-muted p-2 rounded"
                    onClick={() => setIsChatOpen(true)}
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Chat Online</p>
                      <p className="text-sm text-muted-foreground">Disponível no site</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Paulista, 1000
                        <br />
                        São Paulo - SP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Horário de Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Segunda a Sexta:</span>
                      <span>8h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado:</span>
                      <span>8h às 14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo:</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          required
                          value={form.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Assunto *</Label>
                        <Select value={form.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o assunto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pedido">Dúvidas sobre Pedido</SelectItem>
                            <SelectItem value="produto">Informações de Produto</SelectItem>
                            <SelectItem value="entrega">Problemas de Entrega</SelectItem>
                            <SelectItem value="garantia">Garantia</SelectItem>
                            <SelectItem value="troca">Trocas e Devoluções</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        placeholder="Descreva sua dúvida ou solicitação..."
                        value={form.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
