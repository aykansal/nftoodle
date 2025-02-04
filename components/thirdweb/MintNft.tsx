// MintNft.tsx
"use client";

import { main } from "@/app/api/mint-nft/get";
import { useActiveAccount } from "thirdweb/react";
import { mintWithSignature } from "thirdweb/extensions/erc721";
import { defineChain } from "thirdweb/chains";
import {
  sendAndConfirmTransaction,
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CONTRACT_ADDRESS = "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db";
const CHAIN_ID = 656476;
const CLIENT_ID = "aa99b0e9769d2262d120e7aec4ec7a94";

export default function MintNft({
  // @ts-expect-error ignore
  name,
  // @ts-expect-error ignore
  description,
  // @ts-expect-error ignore
  image,
  // @ts-expect-error ignore
  minted,
  // @ts-expect-error ignore
  memeId,
  // @ts-expect-error ignore
  isMinting,
  // @ts-expect-error ignore
  isCurrentMinting,
  // @ts-expect-error ignore
  onMintStart,
  // @ts-expect-error ignore
  onMintComplete,
}) {
  const [error, setError] = useState(null);
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
        // @ts-expect-error ignore
        setError("Failed to load NFT image");
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [image]);

  useEffect(() => {
    if (!name || !description || !image) {
      // @ts-expect-error ignore
      setError("Missing required NFT metadata");
    }
  }, [name, description, image]);

  // @ts-expect-error ignore
  const handleError = (error, message) => {
    if (error?.code === 4001) {
      return;
    } else if (
      error?.code === -32000 &&
      error?.message?.includes("Insufficient funds")
    ) {
      // @ts-expect-error ignore
      setError("Insufficient funds to complete transaction");
      onMintComplete(false);
      return;
    }
    console.log(message, error);
    setError(message);
    onMintComplete(false);
  };

  async function mint() {
    if (!wallet) {
      handleError(null, "Please connect your wallet first");
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

      console.log("Mint successful:", mintResponse);

      // Update database for this specific meme
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: wallet,
          memeId: memeId,
          hasMinted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update mint status in DB");
      }

      setSuccess(true);
      setShowTooltip(true);
      onMintComplete(true);
    } catch (error) {
      // @ts-expect-error ignore
      if (error.message.includes("user rejected")) {
        handleError(error, "Transaction was rejected by user");
        // @ts-expect-error ignore
      } else if (error.message.includes("insufficient funds")) {
        handleError(error, "Insufficient funds to complete transaction");
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
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
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
                <div className="w-full font-ibm">
                  {minted ? (
                    <Button className="bg-green-700 hover:bg-green/90 py-3 rounded-full w-full font-bold text-white transform transition-all duration-300 ease-in-out hover:scale-105">
                      Already Minted
                    </Button>
                  ) : (
                    <Button
                      className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/90 py-3 rounded-full w-full font-bold text-white transform transition-all duration-300 ease-in-out hover:scale-105"
                      disabled={isButtonDisabled}
                      onClick={mint}
                    >
                      {isCurrentMinting ? "Minting..." : "Mint"}
                    </Button>
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

// "use client";

// import { main } from "@/app/api/mint-nft/get";
// import { useActiveAccount } from "thirdweb/react";
// import { mintWithSignature } from "thirdweb/extensions/erc721";
// import { defineChain } from "thirdweb/chains";
// import {
//   sendAndConfirmTransaction,
//   createThirdwebClient,
//   getContract,
// } from "thirdweb";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import {
//   Tooltip,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// const CONTRACT_ADDRESS = "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db";
// const CHAIN_ID = 656476;
// const CLIENT_ID = "aa99b0e9769d2262d120e7aec4ec7a94";

// export default function MintNft({ name, description, image, minted }) {
//   const [minting, setMinting] = useState(false);
//   const [isMintedOnce, setIsMintedOnce] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);

//   const activeAccount = useActiveAccount();
//   const wallet = activeAccount?.address;

//   const client = createThirdwebClient({
//     clientId: CLIENT_ID,
//   });

//   useEffect(() => {
//     if (image) {
//       const img = new Image();
//       img.src = image;
//       img.onload = () => {
//         setImageLoaded(true);
//         setIsLoading(false);
//       };
//       img.onerror = () => {
//         setError("Failed to load NFT image");
//         setIsLoading(false);
//       };
//     } else {
//       setIsLoading(false);
//     }
//   }, [image]);

//   useEffect(() => {
//     if (!name || !description || !image) {
//       setError("Missing required NFT metadata");
//     }
//   }, [name, description, image]);

//   const handleError = (error, message) => {
//     if (error.code === 4001) {
//       // setError("You denied Transaction");
//       return;
//     } else if (
//       error.code === -32000 &&
//       error.message.includes("Insufficient funds")
//     ) {
//       setError("Insufficient funds to complete transaction");
//       setMinting(false);
//       return;
//     }
//     console.log(message, error);
//     setError(message);
//     setMinting(false);
//   };

//   async function mint() {
//     if (!wallet) {
//       handleError(null, "Please connect your wallet first");
//       return;
//     }

//     try {
//       setMinting(true);
//       setError(null);
//       setSuccess(false);

//       const { payload, signature } = await main(
//         wallet,
//         name,
//         description,
//         image
//       ).catch((error) => {
//         throw new Error(`Failed to get signature: ${error.message}`);
//       });

//       const contract = getContract({
//         client,
//         chain: defineChain(CHAIN_ID),
//         address: CONTRACT_ADDRESS,
//       });

//       const transaction = mintWithSignature({
//         contract,
//         payload,
//         signature,
//       });

//       const mintResponse = await sendAndConfirmTransaction({
//         transaction,
//         account: activeAccount,
//       });

//       console.log("Mint successful:", mintResponse);
//       if (mintResponse) {
//         setIsMintedOnce(true);
//       }

//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           address: wallet,
//           hasMinted: true,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update mint status in DB');
//       }

//       setSuccess(true);
//       setShowTooltip(true);

//     } catch (error) {
//       if (error.message.includes("user rejected")) {
//         handleError(error, "Transaction was rejected by user");
//         return;
//       } else if (error.message.includes("insufficient funds")) {
//         handleError(error, "Insufficient funds to complete transaction");
//         return;
//       } else {
//         handleError(error, `Failed to mint NFT: ${error.message}`);
//         return;
//       }
//     } finally {
//       setMinting(false);
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="space-y-4 animate-pulse">
//         <div className="bg-gray-200 rounded-lg h-64" />
//         <div className="bg-gray-200 rounded h-10" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {success && (
//         <Alert>
//           <AlertDescription>NFT successfully minted! Check your wallet.</AlertDescription>
//         </Alert>
//       )}

//       {imageLoaded && (
//         <>
//           <div className="relative">
//           </div>

//           <TooltipProvider delayDuration={0}>
//             <Tooltip open={isMintedOnce && showTooltip}>
//               <TooltipTrigger asChild>
//                 <div className="w-full font-ibm">

//                   {(minted || isMintedOnce) ? <Button className="bg-green-700 hover:bg-green/90 py-3 rounded-full w-full font-bold text-white transform transition-all duration-300 ease-in-out hover:scale-105"

//                   > Already Minted </Button>
//                     : <Button className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/90 py-3 rounded-full w-full font-bold text-white transform transition-all duration-300 ease-in-out hover:scale-105"
//                       disabled={minting || isMintedOnce || !!error}
//                       onClick={mint}

//                     >
//                       {minting ? "Minting..." : "Mint"}
//                     </Button>}

//                 </div>
//               </TooltipTrigger>
//             </Tooltip>
//           </TooltipProvider>
//         </>
//       )}
//     </div>
//   );
// }
