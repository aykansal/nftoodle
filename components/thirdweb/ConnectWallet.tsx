import axios from 'axios';
import { coreChain, eduChain, client } from '@/lib/thirdweb';
import { ConnectButton } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';

export default function ConnectWallet() {
  return (
    <ConnectButton
      chains={[coreChain, eduChain]}
      client={client}
      signInButton={{
        label: 'Sign in now!',
      }}
      wallets={[createWallet('io.metamask')]}
      onConnect={async (wallet) => {
        const dbResp = await axios.post('/api/checkUser', {
          userWallet: wallet?.getAccount()?.address,
        });
        console.log(dbResp.data);
      }}
    />
  );
}
