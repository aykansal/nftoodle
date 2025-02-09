import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';

const XShareButton = ({ imageUrl }: { imageUrl: string }) => {
  const shareOnTwitter = () => {
    try {
      const tweetContent = encodeURIComponent(
        `I have created this Meme of NFT! Make your own at https://nftoodle.ayverse.me.\n\n` +
          `Check out my meme:\n${imageUrl}\n\n` +
          `credits: @aykansal & @satyanshmittal`
      );
      const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetContent}`;
      window.open(twitterUrl, '_blank');
      toast.success('Opening X to share your meme! 🎉');
    } catch (error) {
      console.error('Error sharing to X:', error);
      toast.error('Failed to share on X. Please try again.');
    }
  };

  return (
    <Button
      className="flex justify-center items-center gap-2 bg-gradient-to-r from-white via-[#FF0B7A] to-[#FF0B7A] hover:shadow-lg px-4 py-2 rounded-full w-full sm:w-auto text-white transform transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={shareOnTwitter}
    >
      Share on
      <Image src="/x.svg" alt="X" width={20} height={20} />
    </Button>
  );
};

export default XShareButton;
