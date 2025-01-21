"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MemeGenerator } from "@/components/meme-generator";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const urlParam = searchParams.get("imageUrl");
      if (urlParam) {
        setImageUrl(decodeURIComponent(urlParam));
      }
    }
  }, [isMounted, searchParams]);

  if (!isMounted) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-black mx-auto px-4 pt-3 h-[90vh] container">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <MemeGenerator defaultImage={imageUrl} />
      </Suspense>
    </div>
  );
}
