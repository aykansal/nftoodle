import { Circle, Square, Triangle } from "lucide-react";

export default function Loading()  {
  return (
    <div className="min-h-[66vh] flex justify-center items-center space-x-4">
      <Square className="w-12 h-12 text-[#FF0B7A] animate-spin" />
      <Circle className="w-12 h-12 text-[#45D62E] animate-pulse" />
      <Triangle className="w-12 h-12 text-[#FF0B7A] animate-bounce" />
    </div>
  );
};