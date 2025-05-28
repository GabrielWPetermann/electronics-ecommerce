"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductFilters } from "@/components/product-filters"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  subcategories: string[]
  selectedSubcategory: string
  onSubcategoryChange: (subcategory: string) => void
  onFiltersChange: (filters: any) => void
  availableBrands: string[]
  maxPrice: number
}

export function MobileSidebar({
  isOpen,
  onClose,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  onFiltersChange,
  availableBrands,
  maxPrice,
}: MobileSidebarProps) {
  const handleSubcategoryClick = (subcategory: string) => {
    onSubcategoryChange(subcategory)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-background border-r z-50 lg:hidden overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Subcategorias */}
          <div className="mb-8">
            <div className="bg-gray-900 text-white px-3 py-2 text-sm font-medium mb-3">Todos</div>
            <div className="space-y-1">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors ${
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

          {/* Filtros */}
          <div>
            <div className="bg-gray-900 text-white px-3 py-2 text-sm font-medium mb-3 flex items-center justify-between">
              <span>Filtros</span>
              <button className="text-xs text-blue-300 hover:text-blue-200">Limpar</button>
            </div>
            <ProductFilters onFiltersChange={onFiltersChange} availableBrands={availableBrands} maxPrice={maxPrice} />
          </div>
        </div>
      </div>
    </>
  )
}
