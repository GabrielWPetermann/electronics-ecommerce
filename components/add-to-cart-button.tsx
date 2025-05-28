"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
  }
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AddToCartButton({ product, variant = "default", size = "default", className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    })

    toast.success("Produto adicionado ao carrinho!", {
      description: product.name,
      action: {
        label: "Ver carrinho",
        onClick: () => useCartStore.getState().setIsOpen(true),
      },
    })
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleAddToCart}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      Adicionar ao Carrinho
    </Button>
  )
}
