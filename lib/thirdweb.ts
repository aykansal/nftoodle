import { createWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
    clientId: `${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}`,
    // secretKey: `${process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY}`,
});


export const wallet = createWallet("io.metamask");

// export const connectWallet = async () => {
//     const account = await wallet.connect({
//         client,
//     });
//     return account;
// };
