import axios from "axios";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { coreChain, thirdwebClient } from "@/lib/thirdweb";

export default function ConnectWallet() {
  return (
    <ConnectButton
      chains={[coreChain]}
      client={thirdwebClient}
      signInButton={{
        label: "Sign in now!",
      }}
      wallets={[createWallet("io.metamask")]}
      onConnect={async (wallet) => {
        const dbResp = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkUser`,
          {
            userWallet: wallet?.getAccount()?.address,
          }
        );
        console.log(dbResp.data);
      }}
    />
  );
}
