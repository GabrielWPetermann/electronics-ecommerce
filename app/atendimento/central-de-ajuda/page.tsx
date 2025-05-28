"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/ui/back-button"
import { Chatbot } from "@/components/chatbot"
import { Search, HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"

const faqItems = [
  {
    question: "Como faço para rastrear meu pedido?",
    answer: "Você pode rastrear seu pedido na seção 'Meus Pedidos' ou através do link enviado por e-mail.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "O prazo de entrega varia de 2 a 7 dias úteis, dependendo da sua localização e do produto.",
  },
  {
    question: "Como alterar ou cancelar um pedido?",
    answer: "Pedidos podem ser alterados ou cancelados em até 2 horas após a confirmação.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer: "Aceitamos cartão de crédito, débito, PIX e boleto bancário.",
  },
  {
    question: "Como funciona a garantia dos produtos?",
    answer:
      "Todos os produtos possuem garantia do fabricante. Eletrônicos têm 12 meses e eletrodomésticos até 24 meses.",
  },
]

export default function CentralDeAjudaPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section")
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" })
    }
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Central de Ajuda</h1>
            <p className="text-muted-foreground">Como podemos ajudar você hoje?</p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Busque por uma dúvida..." className="pl-10 py-3 text-lg" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={scrollToFAQ}>
              <CardContent className="p-6">
                <HelpCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">FAQ</h3>
                <p className="text-sm text-muted-foreground">Perguntas frequentes</p>
              </CardContent>
            </Card>

            <Card
              className="text-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setIsChatOpen(true)}
            >
              <CardContent className="p-6">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Chat</h3>
                <p className="text-sm text-muted-foreground">Fale conosco online</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={openWhatsApp}>
              <CardContent className="p-6">
                <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={openEmail}>
              <CardContent className="p-6">
                <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">E-mail</h3>
                <p className="text-sm text-muted-foreground">Envie uma mensagem</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div id="faq-section">
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
