import { Circle, Square, Triangle } from 'lucide-react';

export default function Loader() {
  return (
    <div className="min-h-full flex justify-center items-center space-x-4">
      <Triangle className="w-12 h-12 text-[#FF0B7A] animate-bounce" />
      <Circle className="w-12 h-12 text-[#45D62E] animate-pulse" />
      <Square className="w-12 h-12 text-[#FF0B7A] animate-spin" />
    </div>
  );
}
