"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { allProducts } from "@/lib/products-data"
import Image from "next/image"
import Link from "next/link"

export function SearchDropdown() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState(allProducts.slice(0, 5))
  const searchRef = useRef<HTMLDivElement>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5)
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults(allProducts.slice(0, 5))
      setIsOpen(false)
    }
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar produtos..."
          className="pl-10 pr-4 bg-white text-gray-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href}
                    onClick={() => {
                      setIsOpen(false)
                      setSearchTerm("")
                    }}
                  >
                    <div className="flex items-center space-x-3 p-2 hover:bg-muted rounded-md cursor-pointer">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">Nenhum produto encontrado</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
