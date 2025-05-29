"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, Menu, Star, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"
import { CartSheet } from "@/components/cart-sheet"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductFilters } from "@/components/product-filters"
import { ProductModal } from "@/components/product-modal"
import { casaInteligenteProducts, type Product } from "@/lib/products-data"

const subcategories = ["Todos", "Assistentes", "Iluminação", "Segurança", "Automação", "Sensores"]

type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "mais-vendidos" | "melhor-avaliacao"

interface FilterState {
  priceRange: [number, number]
  brands: string[]
  ratings: number[]
  inStock: boolean
}

export default function CasaInteligentePage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState("Todos")
  const [sortBy, setSortBy] = useState<SortOption>("relevancia")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    brands: [],
    ratings: [],
    inStock: false,
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  // Filtrar e ordenar produtos
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = casaInteligenteProducts.filter((product) => {
      // Filtro por subcategoria
      if (selectedSubcategory !== "Todos" && product.subcategory !== selectedSubcategory) {
        return false
      }

      // Filtro por preço
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Filtro por marca
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Filtro por avaliação
      if (filters.ratings.length > 0 && !filters.ratings.some((rating) => product.rating >= rating)) {
        return false
      }

      // Filtro por estoque
      if (filters.inStock && !product.inStock) {
        return false
      }

      return true
    })

    // Ordenação
    switch (sortBy) {
      case "menor-preco":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "maior-preco":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "mais-vendidos":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "melhor-avaliacao":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [selectedSubcategory, sortBy, filters])

  const availableBrands = useMemo(() => {
    return Array.from(new Set(casaInteligenteProducts.map((product) => product.brand)))
  }, [])

  const maxPrice = useMemo(() => {
    return Math.max(...casaInteligenteProducts.map((product) => product.price))
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

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
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Buscar produtos..." className="pl-10 pr-4 bg-white" />
              </div>
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

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Casa Inteligente</span>
            </nav>
            <BackButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Subcategorias</h3>
              <div className="space-y-2">
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => setSelectedSubcategory(subcategory)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded ${
                      selectedSubcategory === subcategory
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>

            <ProductFilters onFiltersChange={setFilters} availableBrands={availableBrands} maxPrice={maxPrice} />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Casa Inteligente</h1>
                <p className="text-muted-foreground mt-1">{filteredAndSortedProducts.length} produtos encontrados</p>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Mais Relevantes</SelectItem>
                    <SelectItem value="menor-preco">Menor Preço</SelectItem>
                    <SelectItem value="maior-preco">Maior Preço</SelectItem>
                    <SelectItem value="mais-vendidos">Mais Vendidos</SelectItem>
                    <SelectItem value="melhor-avaliacao">Melhor Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {product.originalPrice && (
                          <Badge className="absolute top-2 left-2" variant="destructive">
                            Oferta
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge className="absolute top-2 right-2" variant="secondary">
                            Esgotado
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {product.subcategory}
                        </Badge>
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                            <span className="ml-1 text-sm text-muted-foreground">({product.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm" disabled={!product.inStock}>
                          {product.inStock ? "Ver Produto" : "Esgotado"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
