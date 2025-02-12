// MintNft.tsx
'use client';

import { main } from '@/app/api/mint-nft/get';
import { useActiveAccount } from 'thirdweb/react';
import { mintWithSignature } from 'thirdweb/extensions/erc721';
import { defineChain } from 'thirdweb/chains';
import {
  sendAndConfirmTransaction,
  createThirdwebClient,
  getContract,
} from 'thirdweb';
import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/styles/animations';
import { MintNftData } from '@/lib/types';

const CONTRACT_ADDRESS = '0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db';
const CHAIN_ID = 656476;
const CLIENT_ID = 'aa99b0e9769d2262d120e7aec4ec7a94';

export default function MintNft({
  name,
  description,
  image,
  minted,
  memeId,
  isMinting,
  isCurrentMinting,
  onMintStart,
  onMintComplete,
}: MintNftData) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const activeAccount = useActiveAccount();
  const wallet = activeAccount?.address;

  const client = createThirdwebClient({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImageLoaded(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError('Failed to load NFT image');
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [image]);

  useEffect(() => {
    if (!name || !description || !image) {
      setError('Missing required NFT metadata');
    }
  }, [name, description, image]);

  // @ts-expect-error ignore
  const handleError = (error, message) => {
    if (error?.code === 4001) {
      return;
    } else if (
      error?.code === -32000 &&
      error?.message?.includes('Insufficient funds')
    ) {
      setError('Insufficient funds to complete transaction');
      onMintComplete(false);
      return;
    }
    console.log('err in handleError MinNft.tsx', message, error);
    setError(message);
    onMintComplete(false);
  };

  async function mint() {
    if (!wallet) {
      handleError(null, 'Please connect your wallet first');
      return;
    }

    try {
      onMintStart();
      setError(null);
      setSuccess(false);

      const { payload, signature } = await main(
        wallet,
        name,
        description,
        image
      ).catch((error) => {
        throw new Error(`Failed to get signature: ${error.message}`);
      });

      const contract = getContract({
        client,
        chain: defineChain(CHAIN_ID),
        address: CONTRACT_ADDRESS,
      });

      const transaction = mintWithSignature({
        contract,
        payload,
        signature,
      });

      const mintResponse = await sendAndConfirmTransaction({
        transaction,
        account: activeAccount,
      });

      console.log('Mint successful:', mintResponse);

      // Update database for this specific meme
      const response = await axios.put('/api/memes', {
        userWallet: wallet,
        memeId,
        txnHash: mintResponse.transactionHash,
      });

      if (!response.data) {
        throw new Error('Failed to update mint status in DB');
      }

      setSuccess(true);
      setShowTooltip(true);
      onMintComplete(true);
    } catch (error) {
      // @ts-expect-error ignore
      if (error.message.includes('user rejected')) {
        handleError(error, 'Transaction was rejected by user');
        // @ts-expect-error ignore
      } else if (error.message.includes('insufficient funds')) {
        handleError(error, 'Insufficient funds to complete transaction');
      } else {
        // @ts-expect-error ignore
        handleError(error, `Failed to mint NFT: ${error.message}`);
      }
    } finally {
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="bg-gray-200 rounded-lg h-64" />
        <div className="bg-gray-200 rounded h-10" />
      </div>
    );
  }

  const isButtonDisabled = minted || isMinting || !!error;

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900/20 border-green-900 text-green-400">
          <AlertDescription>
            NFT successfully minted! Check your wallet.
          </AlertDescription>
        </Alert>
      )}

      {imageLoaded && (
        <>
          <div className="relative"></div>
          <TooltipProvider delayDuration={0}>
            <Tooltip open={success && showTooltip}>
              <TooltipTrigger asChild>
                <div className="w-full font-squid">
                  {minted ? (
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full px-4 py-2 rounded-lg font-bold text-white bg-green-600/20 border-2 border-green-500 backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    >
                      Already Minted
                    </motion.button>
                  ) : (
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full px-4 py-2 rounded-lg font-bold text-white squid-button transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isCurrentMinting ? 'animate-pulse' : ''
                      }`}
                      disabled={isButtonDisabled}
                      onClick={mint}
                    >
                      {isCurrentMinting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Minting...
                        </span>
                      ) : (
                        'Mint NFT'
                      )}
                    </motion.button>
                  )}
                </div>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
}
