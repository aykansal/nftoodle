// import { prisma } from "./prisma";
// export const verifyValidImages = async (imageUrls: string[]) => {
//   const validTokens: string[] = [];
//   for (const url of imageUrls) {
//     const verifiedStatus = await prisma.nft.findUnique({
//       where: {
//         nftUrls: url
//       }
//     }).then((url) => url?.verified ? true : false)

//     try {
//       const img = new Image();
//       img.src = url;
//       await new Promise((resolve, reject) => {
//         img.onload = resolve;
//         img.onerror = reject;
//       });
//       validTokens.push(url);
//     } catch { }
//   }
//   return validTokens;
// };

// export const verifyImage = async (imageUrl: string) => {
//   try {
//     const img = new Image();
//     img.src = imageUrl;
//     console.log(imageUrl)
//     await new Promise((resolve, reject) => {
//       img.onload = resolve;
//       img.onerror = reject;
//     });
//     return true;
//   } catch {
//     return false
//   }
// };
