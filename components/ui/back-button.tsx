"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  className?: string
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()} className={className}>
      <ArrowLeft className="h-4 w-4 mr-2" />
      Voltar
    </Button>
  )
}
