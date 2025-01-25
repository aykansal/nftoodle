import { createWallet } from "thirdweb/wallets";

import { createThirdwebClient } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

const clientKey = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
export const client = createThirdwebClient({
    clientId: `${clientKey}`,
});

export const wallet = createWallet("io.metamask");