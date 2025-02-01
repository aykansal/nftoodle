'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Triangle, Circle, Square } from "lucide-react"
import { useActiveAccount } from 'thirdweb/react'
import MintNft from "@/components/thirdweb/uplaodNft"


interface Meme {
  id: string
  cloudinaryUrl: string
  minted: boolean
}

export default function MyMemes() {
  const [memes, setMemes] = useState<Meme[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const account = useActiveAccount()?.address

console.log(account)
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('/api/profile?address=' + account)
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
          throw new Error('Failed to fetch memes')
        }

        console.log(data.memes[0].minted)
        setMemes(data.memes)

      } catch (error) {
        console.error('Error fetching memes:', error)
        setMemes([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMemes()
  }, [])

  // const handleMintNFT = async (memeId: string) => {
  //   try {
  //     // TODO: Implement NFT minting logic
  //     console.log(`Minting meme ${memeId} as NFT...`)
  //     // Update meme status after successful minting
  //     setMemes(prevMemes =>
  //       prevMemes.map(meme =>
  //         meme.id === memeId ? { ...meme, isMinted: true } : meme
  //       )
  //     )
  //   } catch (error) {
  //     console.error('Error minting NFT:', error)
  //   }
  // }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Circle className="w-12 h-12 text-pink-500" />
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-8 min-h-screen text-white"
    >
      <header className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="mb-4 font-bold text-4xl text-pink-500 hover:text-pink-400 transition-colors"
        >
          My Meme Collection
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-green-400 text-xl hover:text-green-300 transition-colors"
        >
          Manage and Mint Your Squid Game Memes!
        </motion.p>
      </header>
      
      {memes.length === 0 ? (
        <motion.p 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center text-green-400"
        >
          No memes generated yet.
        </motion.p>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {memes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="border-2 border-pink-500 bg-gray-800 overflow-hidden hover:border-pink-400 transition-colors">
                <CardContent className="relative p-0">
                  <div className="relative aspect-square w-full overflow-hidden group">
                    <Image
                      src={meme.cloudinaryUrl}
                      alt="Generated Meme"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <motion.div 
                    className="p-4"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                  >
                    {/* <Button
                      className={`w-full transition-all duration-300 ${
                        meme.isMinted 
                          ? 'bg-gray-700 text-green-400 hover:bg-gray-600'
                          : 'bg-pink-500 hover:bg-pink-600 text-white hover:shadow-lg hover:shadow-pink-500/30'
                      }`}
                    > */}
                      {/* {meme.isMinted ? '✨ Minted ✨' : 'Mint as NFT'} */}
                      <MintNft name={'NFT Meme'} description={`This meme is minted by ${account}`} image={meme.cloudinaryUrl} minted={meme.minted} />
                    {/* </Button> */}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <footer className="mt-16 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4 text-green-400 text-lg hover:text-green-300 transition-colors"
        >
          Mint your favorite memes as NFTs!
          {/* <MintNft name={'NFT Meme'} description={`This meme is minted by ${account} /> */}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center items-center space-x-8"
        >
          <Triangle className="w-8 h-8 text-pink-500 animate-bounce hover:text-pink-400 transition-colors" />
          <Circle className="w-8 h-8 text-purple-500 animate-pulse hover:text-purple-400 transition-colors" />
          <Square className="w-8 h-8 text-green-500 animate-spin hover:text-green-400 transition-colors" />
        </motion.div>
      </footer>
    </motion.div>
  )
}
