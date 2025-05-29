"use client"

import Image from "next/image"
import Link from "next/link"
import { Package, Menu, Truck, Shield, Headphones } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CartSheet } from "@/components/cart-sheet"
import { SearchDropdown } from "@/components/search-dropdown"
import { ModernHero } from "@/components/modern-hero"
import { InteractiveProductCard } from "@/components/interactive-product-card"
import { ProductModal } from "@/components/product-modal"
import { useState } from "react"

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
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b bg-gray-900/95 backdrop-blur-md text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
              <Link href="/" className="flex items-center space-x-3 group">
                <Image
                  src="/logo.png"
                  alt="TechStore Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  TechStore
                </span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <SearchDropdown />
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/meus-pedidos">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800 hover:scale-110 transition-all duration-300"
                >
                  <Package className="h-6 w-6" />
                </Button>
              </Link>
              <CartSheet />
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <ModernHero onScrollToProducts={scrollToFeaturedProducts} />

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-blue-500/[0.02] bg-[size:30px_30px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Frete Grátis", desc: "Em compras acima de R$ 299", color: "blue" },
              { icon: Shield, title: "Garantia Estendida", desc: "Até 3 anos de garantia", color: "green" },
              { icon: Headphones, title: "Suporte 24/7", desc: "Atendimento especializado", color: "purple" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="group flex items-center space-x-4 p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:scale-105 hover:shadow-xl border border-white/20"
              >
                <benefit.icon
                  className={`h-12 w-12 text-${benefit.color}-500 group-hover:scale-110 transition-transform duration-300`}
                />
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Categorias
            </h2>
            <p className="text-xl text-muted-foreground">Explore nossa seleção de produtos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={category.href}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
                  <CardContent className="p-0 relative">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                      </h3>
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
      <section
        id="featured-products"
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-blue-500/[0.02] bg-[size:40px_40px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-muted-foreground">Os mais vendidos com ofertas especiais</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <InteractiveProductCard key={product.id} product={product} onProductClick={handleProductClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo.png" alt="TechStore Logo" width={24} height={24} className="w-6 h-6" />
                <h3 className="font-semibold text-white">TechStore</h3>
              </div>
              <p className="text-gray-400">
                Sua loja de eletrônicos e eletrodomésticos com os melhores preços e qualidade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Categorias</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/categoria/hardware" className="hover:text-blue-400 transition-colors">
                    Hardware
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/smartphones" className="hover:text-blue-400 transition-colors">
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/eletrodomesticos" className="hover:text-blue-400 transition-colors">
                    Eletrodomésticos
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/gaming" className="hover:text-blue-400 transition-colors">
                    Gaming
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Atendimento</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/atendimento/central-de-ajuda" className="hover:text-blue-400 transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/atendimento/trocas-e-devolucoes" className="hover:text-blue-400 transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="/atendimento/garantia" className="hover:text-blue-400 transition-colors">
                    Garantia
                  </Link>
                </li>
                <li>
                  <Link href="/atendimento/fale-conosco" className="hover:text-blue-400 transition-colors">
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>(11) 99999-9999</li>
                <li>contato@techstore.com</li>
                <li>Segunda a Sexta: 8h às 18h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechStore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
