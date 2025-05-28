import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddToCartButton } from "@/components/add-to-cart-button"

const product = {
  id: "1",
  name: "Teclado Mecânico RGB Gamer",
  price: 299.0,
  originalPrice: 399.0,
  image: "/images/teclado-mecanico-rgb.png",
  category: "Hardware",
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categoria/hardware" className="hover:text-foreground">
              Hardware
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Teclado Mecânico RGB Gamer</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border">
              <Image
                src="/images/teclado-mecanico-rgb.png"
                alt="Teclado Mecânico RGB Gamer"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4" variant="destructive">
                25% OFF
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative overflow-hidden rounded border cursor-pointer hover:border-primary"
                >
                  <Image
                    src="/images/teclado-mecanico-rgb.png"
                    alt={`Teclado ângulo ${i}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                Hardware
              </Badge>
              <h1 className="text-3xl font-bold mb-4">Teclado Mecânico RGB Gamer</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-medium">4.8</span>
                </div>
                <span className="text-sm text-muted-foreground">(234 avaliações)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
                <Badge variant="destructive">25% OFF</Badge>
              </div>

              <p className="text-muted-foreground mb-6">
                Teclado mecânico gamer com switches azuis, iluminação RGB personalizável, teclas anti-ghosting e design
                ergonômico para máxima performance em jogos.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Cor</label>
                <div className="flex space-x-2">
                  {["Preto", "Branco", "RGB"].map((color) => (
                    <Button key={color} variant="outline" size="sm">
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Quantidade</label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <SelectItem key={qty} value={qty.toString()}>
                        {qty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <AddToCartButton product={product} size="lg" className="flex-1" />
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Frete Grátis</p>
                  <p className="text-xs text-muted-foreground">Entrega em 2-3 dias</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Garantia</p>
                  <p className="text-xs text-muted-foreground">12 meses</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Devolução</p>
                  <p className="text-xs text-muted-foreground">30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Descrição do Produto</h3>
                <div className="prose max-w-none">
                  <p>
                    O Teclado Mecânico RGB Gamer oferece a experiência definitiva para gamers profissionais e
                    entusiastas. Equipado com switches mecânicos azuis de alta qualidade, proporciona feedback tátil
                    preciso e durabilidade excepcional com mais de 50 milhões de cliques por tecla.
                  </p>
                  <p>
                    A iluminação RGB personalizável com 16,7 milhões de cores permite criar efeitos visuais únicos,
                    sincronizados com seus jogos favoritos. O design anti-ghosting garante que todas as teclas sejam
                    registradas simultaneamente, essencial para combos complexos em jogos competitivos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Geral</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Tipo: Mecânico</li>
                      <li>Layout: ABNT2</li>
                      <li>Switches: Azuis</li>
                      <li>Teclas: 104</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Conectividade</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Conexão: USB 2.0</li>
                      <li>Cabo: 1.8m trançado</li>
                      <li>Polling Rate: 1000Hz</li>
                      <li>Anti-ghosting: Sim</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Avaliações dos Clientes</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">João Silva</span>
                        <span className="text-sm text-muted-foreground">há 2 dias</span>
                      </div>
                      <p className="text-sm">
                        Excelente teclado! A qualidade dos switches é impressionante e a iluminação RGB é linda.
                        Recomendo para qualquer gamer.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
