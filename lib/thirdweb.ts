import { createWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";

const clientKey=process.env.THIRDWEB_CLIENT_ID
export const client = createThirdwebClient({
    clientId: `${clientKey}`,
});

export const wallet = createWallet("io.metamask");