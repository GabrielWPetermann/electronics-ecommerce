"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"
import type { Product } from "@/lib/products-data"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const addItem = useCartStore((state) => state.addItem)

  // Early return if no product
  if (!product) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Produto não encontrado</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">
            <p>Produto não disponível</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      })
    }

    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`, {
      action: {
        label: "Ver carrinho",
        onClick: () => useCartStore.getState().setIsOpen(true),
      },
    })

    onClose()
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Pequeno delay para garantir que o item foi adicionado
    setTimeout(() => {
      useCartStore.getState().setIsOpen(true)
    }, 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4" variant="destructive">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative overflow-hidden rounded border cursor-pointer hover:border-primary"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} ângulo ${i}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating || 0}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews || 0} avaliações)</span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{product.description || "Descrição não disponível"}</p>
            </div>

            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Cor</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma cor" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Quantidade</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                Adicionar ao Carrinho
              </Button>
              <Button onClick={handleBuyNow} className="flex-1">
                Comprar Agora
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Frete Grátis</p>
                  <p className="text-xs text-muted-foreground">Entrega em 2-3 dias</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Garantia</p>
                  <p className="text-xs text-muted-foreground">12 meses</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Devolução</p>
                  <p className="text-xs text-muted-foreground">30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p>{product.description || "Descrição não disponível"}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Especificações não disponíveis</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
