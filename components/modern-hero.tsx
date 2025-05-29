"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MouseFollower, FloatingParticles, GlowingOrb } from "./modern-effects"

interface ModernHeroProps {
  onScrollToProducts: () => void
}

export function ModernHero({ onScrollToProducts }: ModernHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <MouseFollower>
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <FloatingParticles />
        <GlowingOrb />

        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        {/* Dynamic Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed"
          style={{
            right: mousePosition.x / 15,
            bottom: mousePosition.y / 15,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
          {/* Animated Logo */}
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
            <Image
              src="/logo.png"
              alt="TechStore Logo"
              width={120}
              height={120}
              className="relative w-30 h-30 animate-float drop-shadow-2xl hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Animated Text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            <span className="inline-block animate-bounce-slow">Eletrônicos</span>
            <span className="mx-4 text-blue-400">&</span>
            <span className="inline-block animate-bounce-slow animation-delay-300">Eletrodomésticos</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl animate-fade-in-up">
            As melhores marcas com os melhores preços
            <span className="block text-lg text-blue-300 mt-2">Tecnologia que transforma sua vida</span>
          </p>

          {/* Interactive CTA Button */}
          <Button
            size="lg"
            onClick={onScrollToProducts}
            className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 rounded-full border-0 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 animate-fade-in-up animation-delay-600"
          >
            <span className="relative z-10 flex items-center gap-2">✨ Ver Ofertas Exclusivas</span>

            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
          </Button>

          {/* Floating Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-blue-400 animate-count-up">10k+</div>
              <div className="text-sm opacity-75">Produtos</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-purple-400 animate-count-up animation-delay-300">50k+</div>
              <div className="text-sm opacity-75">Clientes</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-pink-400 animate-count-up animation-delay-600">99%</div>
              <div className="text-sm opacity-75">Satisfação</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </MouseFollower>
  )
}
