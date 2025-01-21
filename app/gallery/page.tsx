"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Triangle, Circle, Square } from "lucide-react"

const memes = [
  { id: 1, url: "/placeholder.svg?height=300&width=300", title: "Squid Meme 1" },
  { id: 2, url: "/placeholder.svg?height=400&width=300", title: "Squid Meme 2" },
  { id: 3, url: "/placeholder.svg?height=350&width=300", title: "Squid Meme 3" },
  { id: 4, url: "/placeholder.svg?height=280&width=300", title: "Squid Meme 4" },
  { id: 5, url: "/placeholder.svg?height=320&width=300", title: "Squid Meme 5" },
  { id: 6, url: "/placeholder.svg?height=360&width=300", title: "Squid Meme 6" },
]

export default function Showcase() {
  const [hoveredMeme, setHoveredMeme] = useState<number | null>(null)

  return (
    <div className="bg-gray-900 p-8 min-h-screen text-white">
      <header className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl text-pink-500">Squid Meme Showcase</h1>
        <p className="text-green-400 text-xl">Discover and Enjoy Squid Game-Inspired Memes!</p>
      </header>

      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {memes.map((meme) => (
          <motion.div
            key={meme.id}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredMeme(meme.id)}
            onHoverEnd={() => setHoveredMeme(null)}
          >
            <Card className="border-2 border-pink-500 bg-gray-800 overflow-hidden">
              <CardContent className="relative p-0">
                <Image
                  src={meme.url || "/placeholder.svg"}
                  alt={meme.title}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                {hoveredMeme === meme.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
                  >
                    <p className="font-bold text-lg text-white">{meme.title}</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <footer className="mt-16 text-center">
        <p className="mb-4 text-green-400 text-lg">Join the game, share the laughter!</p>
        <div className="flex justify-center items-center space-x-8">
          <Triangle className="w-8 h-8 text-pink-500 animate-bounce" />
          <Circle className="w-8 h-8 text-purple-500 animate-pulse" />
          <Square className="w-8 h-8 text-green-500 animate-spin" />
        </div>
      </footer>
    </div>
  )
}

