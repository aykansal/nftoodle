'use client';

import { useState } from 'react';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Wallet() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const [isOpen, setIsOpen] = useState(false);

  const handleDisconnect = async () => {
    try {
      await wallet?.disconnect();
      setIsOpen(false);
      toast.success('Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return (
    account && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-2 font-ibm text-lg text-white bg-[#FF0B7A] rounded-lg hover:bg-[#FF0B7A]/80 transition-colors">
            ${account.address.slice(0, 6)}...${account.address.slice(-4)}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-[#FF0B7A]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Disconnect Wallet</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to disconnect your wallet? You&apos;ll need to reconnect it to access your account again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-transparent border-[#FF0B7A] text-white hover:bg-[#FF0B7A]/10"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDisconnect}
              className="flex-1 bg-[#FF0B7A] hover:bg-[#FF0B7A]/80"
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
