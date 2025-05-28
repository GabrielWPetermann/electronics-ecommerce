"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, MapPin, User } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"
import { PixQRCode } from "@/components/pix-qrcode"
import { toast } from "sonner"

interface OrderForm {
  // Dados pessoais
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string

  // Endereço
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string

  // Pagamento
  paymentMethod: string
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvv: string

  // Observações
  notes: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPixPayment, setShowPixPayment] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const [form, setForm] = useState<OrderForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    paymentMethod: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    notes: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 299 ? 0 : 29.9
  const total = subtotal + shipping

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCepChange = async (cep: string) => {
    handleInputChange("cep", cep)

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()

        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }))
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast.error("Você deve aceitar os termos e condições")
      return
    }

    setIsLoading(true)

    // Gerar número do pedido
    const newOrderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderNumber(newOrderNumber)

    // Simular processamento do pedido
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (form.paymentMethod === "pix") {
      // Mostrar tela PIX
      setShowPixPayment(true)
    } else {
      // Processar outros pagamentos
      clearCart()
      toast.success("Pedido confirmado com sucesso!", {
        description: `Número do pedido: ${newOrderNumber}`,
        duration: 5000,
      })
      router.push(`/pedido-confirmado?order=${newOrderNumber}`)
    }

    setIsLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <BackButton />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carrinho Vazio</h1>
            <p className="text-muted-foreground mb-8">Adicione produtos ao carrinho para continuar</p>
            <Button onClick={() => router.push("/")}>Continuar Comprando</Button>
          </div>
        </div>
      </div>
    )
  }

  if (showPixPayment) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <BackButton />
          </div>
          <PixQRCode amount={total} orderNumber={orderNumber} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input
                        id="firstName"
                        required
                        value={form.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome *</Label>
                      <Input
                        id="lastName"
                        required
                        value={form.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        required
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        required
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Endereço de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      required
                      placeholder="00000-000"
                      value={form.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="street">Rua *</Label>
                    <Input
                      id="street"
                      required
                      value={form.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        required
                        value={form.number}
                        onChange={(e) => handleInputChange("number", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={form.complement}
                        onChange={(e) => handleInputChange("complement", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      required
                      value={form.neighborhood}
                      onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        required
                        value={form.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={form.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          {/* Adicionar outros estados */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Forma de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={form.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit">Cartão de Crédito</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debit" id="debit" />
                      <Label htmlFor="debit">Cartão de Débito</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix">PIX</Label>
                    </div>
                  </RadioGroup>

                  {(form.paymentMethod === "credit" || form.paymentMethod === "debit") && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          required
                          placeholder="0000 0000 0000 0000"
                          value={form.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          required
                          value={form.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade *</Label>
                          <Input
                            id="cardExpiry"
                            required
                            placeholder="MM/AA"
                            value={form.cardExpiry}
                            onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            required
                            placeholder="000"
                            value={form.cardCvv}
                            onChange={(e) => handleInputChange("cardCvv", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Observações */}
              <Card>
                <CardHeader>
                  <CardTitle>Observações</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Observações sobre o pedido (opcional)"
                    value={form.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete:</span>
                      <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                    <Label htmlFor="terms" className="text-sm">
                      Aceito os termos e condições
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading || !acceptTerms}>
                    {isLoading ? "Processando..." : `Finalizar Pedido - ${formatPrice(total)}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
