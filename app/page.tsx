import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Triangle, Circle, Square } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 p-8 min-h-screen text-white">
      <h1 className="mb-6 font-bold text-5xl text-pink-500">NFToodle</h1>
      <p className="mb-12 max-w-2xl text-2xl text-center text-green-400">
        Transform NFTs into hilarious memes. Join the game, share the laughter!
      </p>

      <div className="flex space-x-6 mb-16">
        <Link href="/create">
          <Button className="bg-pink-500 hover:bg-pink-600 px-8 py-6 text-lg">Create Meme</Button>
        </Link>
        <Link href="/gallery">
          <Button
            variant="ghost"
            className="bg-neutral-100 hover:bg-neutral-200 px-8 py-6 text-lg text-pink-600"
          >
            View Gallery
          </Button>
        </Link>
      </div>

      <div className="flex justify-center items-center space-x-12 mb-12">
        <Triangle className="w-16 h-16 text-pink-500 animate-bounce" />
        <Circle className="w-16 h-16 text-purple-500 animate-pulse" />
        <Square className="w-16 h-16 text-green-500 animate-spin" />
      </div>

      <footer className="bottom-4 absolute text-gray-400 text-sm">
        &copy; 2025 NFToodle. All rights reserved.
      </footer>
    </div>
  )
}