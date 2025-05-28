"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

interface FilterState {
  priceRange: [number, number]
  brands: string[]
  ratings: number[]
  inStock: boolean
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  availableBrands: string[]
  maxPrice: number
}

export function ProductFilters({ onFiltersChange, availableBrands, maxPrice }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, maxPrice],
    brands: [],
    ratings: [],
    inStock: false,
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)
    updateFilters({ brands: newBrands })
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked ? [...filters.ratings, rating] : filters.ratings.filter((r) => r !== rating)
    updateFilters({ ratings: newRatings })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, maxPrice] as [number, number],
      brands: [],
      ratings: [],
      inStock: false,
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpar
        </Button>
      </div>

      {/* Faixa de Preço */}
      <div>
        <h4 className="font-semibold mb-4">Faixa de Preço</h4>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={maxPrice}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div>
        <h4 className="font-semibold mb-4">Marcas</h4>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Avaliação */}
      <div>
        <h4 className="font-semibold mb-4">Avaliação</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">e acima</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Disponibilidade */}
      <div>
        <h4 className="font-semibold mb-4">Disponibilidade</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
          />
          <Label htmlFor="in-stock" className="text-sm">
            Apenas em estoque
          </Label>
        </div>
      </div>
    </div>
  )
}
