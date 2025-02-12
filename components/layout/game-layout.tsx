'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface GameLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function GameLayout({ children, title, description }: GameLayoutProps) {
  const router = useRouter();

  return (
    <div className="p-8 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FF0B7A] mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-[#45D62E] font-ibm mb-4">
              {description}
            </p>
          )}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push('/gamezone')}
              className="bg-transparent hover:bg-[#FF0B7A]/10 text-[#FF0B7A] border-2 border-[#FF0B7A]"
            >
              <Home className="mr-2" size={18} />
              Back to Games
            </Button>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
} 