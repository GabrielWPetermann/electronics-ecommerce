"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
  category: string
}

interface InteractiveProductCardProps {
  product: Product
  onProductClick: (product: Product) => void
}

export function InteractiveProductCard({ product, onProductClick }: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => onProductClick(product)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg)`
          : "none",
      }}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 50%)`,
        }}
      />

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
        <div className="w-full h-full bg-white rounded-lg" />
      </div>

      <CardContent className="relative p-0 z-10">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />

          {/* Floating Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-8 group-hover:translate-x-0">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full backdrop-blur-sm bg-white/80 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full backdrop-blur-sm bg-white/80 hover:bg-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {product.badge && (
            <Badge className="absolute top-2 left-2 animate-pulse bg-gradient-to-r from-red-500 to-pink-500 border-0">
              {product.badge}
            </Badge>
          )}

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="p-4 space-y-3">
          <Badge
            variant="secondary"
            className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0"
          >
            {product.category}
          </Badge>

          <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-300 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
              <span className="ml-1 text-sm text-muted-foreground">({product.reviews})</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="destructive" className="text-xs animate-bounce">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/btn"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </CardContent>

      {/* Ripple Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse" />
      </div>
    </Card>
  )
}
