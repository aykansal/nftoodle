import React from 'react';
import { Button } from '@/components/ui/button';

const XShareButton = ({ imageUrl }: { imageUrl: string }) => {
  const shareOnTwitter = () => {
    const tweetContent = encodeURIComponent(
      `I have created this Meme of NFT! Make your own at https://nftoodle.ayverse.me.\n\n` +
        `Check out my meme:\n${imageUrl}\n\n` +
        `credits: @aykansal & @satyanshmittal`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetContent}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Button
      className="flex justify-center items-center gap-2 bg-gradient-to-r from-white via-[#FF0B7A] to-[#FF0B7A] hover:shadow-lg px-4 py-2 rounded-full w-full sm:w-auto text-white transform transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={shareOnTwitter}
    >
      Share on
      <svg
        width="1200"
        height="1227"
        viewBox="0 0 1200 1227"
        fill="#FF0B7A"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
          fill="white"
        />
      </svg>
    </Button>
  );
};

export default XShareButton;
