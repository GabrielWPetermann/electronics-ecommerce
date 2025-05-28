"use client"

import Image from "next/image"
import Link from "next/link"
import { Package, Menu, Star, Truck, Shield, Headphones } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "@/components/cart-sheet"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { SearchDropdown } from "@/components/search-dropdown"

const categories = [
  {
    id: "hardware",
    name: "Hardware",
    description: "Teclados, mouses, monitores e componentes",
    image: "/images/teclado-mecanico-rgb.png",
    href: "/categoria/hardware",
  },
  {
    id: "smartphones",
    name: "Smartphones & Tablets",
    description: "Celulares, tablets e acessórios",
    image: "/images/iphone-14-pro-purple.png",
    href: "/categoria/smartphones",
  },
  {
    id: "eletrodomesticos",
    name: "Eletrodomésticos",
    description: "Geladeiras, micro-ondas, fogões e mais",
    image: "/images/geladeira-inox.png",
    href: "/categoria/eletrodomesticos",
  },
  {
    id: "audio-video",
    name: "Áudio & Vídeo",
    description: "Fones, caixas de som, TVs e home theater",
    image: "/images/tv-oled-lg.png",
    href: "/categoria/audio-video",
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Consoles, jogos e acessórios gamer",
    image: "/images/playstation-5-bundle.png",
    href: "/categoria/gaming",
  },
  {
    id: "casa-inteligente",
    name: "Casa Inteligente",
    description: "Dispositivos smart home e automação",
    image: "/images/lampada-smart-rgb.png",
    href: "/categoria/casa-inteligente",
  },
]

const featuredProducts = [
  {
    id: "1",
    name: "Teclado Mecânico RGB Gamer",
    price: 299.0,
    originalPrice: 399.0,
    image: "/images/teclado-mecanico-rgb.png",
    rating: 4.8,
    reviews: 234,
    badge: "Mais Vendido",
    category: "Hardware",
  },
  {
    id: "2",
    name: "Mouse Gamer RGB 12000 DPI",
    price: 159.0,
    originalPrice: 199.0,
    image: "/images/mouse-gamer-rgb.png",
    rating: 4.6,
    reviews: 189,
    badge: "Oferta",
    category: "Hardware",
  },
  {
    id: "3",
    name: 'Monitor Gaming 27" G-SYNC',
    price: 1299.0,
    originalPrice: 1599.0,
    image: "/images/monitor-gaming-27.png",
    rating: 4.9,
    reviews: 156,
    badge: "Desconto",
    category: "Hardware",
  },
  {
    id: "4",
    name: 'Smart TV OLED 65" 4K',
    price: 4999.0,
    originalPrice: undefined,
    image: "/images/tv-oled-lg.png",
    rating: 4.8,
    reviews: 432,
    badge: "Novo",
    category: "Áudio & Vídeo",
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

const scrollToFeaturedProducts = () => {
  const element = document.getElementById("featured-products")
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/logo.png" alt="TechStore Logo" width={40} height={40} className="w-10 h-10" />
                <span className="text-2xl font-bold text-white">TechStore</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <SearchDropdown />
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/meus-pedidos">
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <Package className="h-6 w-6" />
                </Button>
              </Link>
              <CartSheet />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="TechStore Logo" width={80} height={80} className="w-20 h-20" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Eletrônicos e Eletrodomésticos</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">As melhores marcas com os melhores preços</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3" onClick={scrollToFeaturedProducts}>
            Ver Ofertas
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Truck className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-semibold">Frete Grátis</h3>
                <p className="text-muted-foreground">Em compras acima de R$ 299</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Shield className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-semibold">Garantia Estendida</h3>
                <p className="text-muted-foreground">Até 3 anos de garantia</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Headphones className="h-12 w-12 text-primary" />
              <div>
                <h3 className="font-semibold">Suporte 24/7</h3>
                <p className="text-muted-foreground">Atendimento especializado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={category.href}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.badge && <Badge className="absolute top-2 left-2">{product.badge}</Badge>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                        <span className="ml-1 text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <AddToCartButton product={product} size="sm" className="w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo.png" alt="TechStore Logo" width={24} height={24} className="w-6 h-6" />
                <h3 className="font-semibold">TechStore</h3>
              </div>
              <p className="text-muted-foreground">
                Sua loja de eletrônicos e eletrodomésticos com os melhores preços e qualidade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/categoria/hardware">Hardware</Link>
                </li>
                <li>
                  <Link href="/categoria/smartphones">Smartphones</Link>
                </li>
                <li>
                  <Link href="/categoria/eletrodomesticos">Eletrodomésticos</Link>
                </li>
                <li>
                  <Link href="/categoria/gaming">Gaming</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/atendimento/central-de-ajuda">Central de Ajuda</Link>
                </li>
                <li>
                  <Link href="/atendimento/trocas-e-devolucoes">Trocas e Devoluções</Link>
                </li>
                <li>
                  <Link href="/atendimento/garantia">Garantia</Link>
                </li>
                <li>
                  <Link href="/atendimento/fale-conosco">Fale Conosco</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>(11) 99999-9999</li>
                <li>contato@techstore.com</li>
                <li>Segunda a Sexta: 8h às 18h</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TechStore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
