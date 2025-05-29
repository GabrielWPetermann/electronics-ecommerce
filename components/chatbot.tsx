"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Bot, User } from "lucide-react"

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

const botResponses = {
  "Como rastrear pedido":
    "Você pode rastrear seu pedido na seção 'Meus Pedidos' ou através do link enviado por e-mail com o código de rastreamento.",
  "Prazo de entrega":
    "O prazo de entrega varia de 2 a 7 dias úteis, dependendo da sua localização e do produto escolhido.",
  "Formas de pagamento":
    "Aceitamos cartão de crédito, débito, PIX e boleto bancário. Todas as formas são seguras e processadas instantaneamente.",
  "Cancelar pedido":
    "Pedidos podem ser cancelados em até 2 horas após a confirmação. Após esse prazo, você pode solicitar troca ou devolução.",
  Garantia:
    "Todos os produtos possuem garantia do fabricante. Eletrônicos têm 12 meses e eletrodomésticos até 24 meses.",
  "Troca e devolução":
    "Você tem até 30 dias para solicitar troca ou devolução. O produto deve estar em perfeito estado com embalagem original.",
  "Falar com humano":
    "Entendo! Você pode entrar em contato conosco pelo telefone 0800 123 4567 ou WhatsApp. Nosso horário de atendimento é de segunda a sexta, das 8h às 18h.",
}

const quickOptions = [
  "Como rastrear pedido",
  "Prazo de entrega",
  "Formas de pagamento",
  "Cancelar pedido",
  "Garantia",
  "Troca e devolução",
  "Falar com humano",
]

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente virtual da TechStore. Como posso ajudar você hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ])

  const handleOptionClick = (option: string) => {
    // Adicionar mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option,
      isBot: false,
      timestamp: new Date(),
    }

    // Adicionar resposta do bot
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponses[option as keyof typeof botResponses] || "Desculpe, não entendi. Pode reformular sua pergunta?",
      isBot: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>Chat TechStore</span>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 max-h-80">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Options */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Escolha uma opção:</p>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {quickOptions.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
