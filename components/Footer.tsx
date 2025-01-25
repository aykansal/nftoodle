import { Circle, Square, Triangle } from "lucide-react";

export const AuthorDetails = ({ className }: { className?: string }) => {
  return (
    <div className={`text-gray-400 text-sm ${className}`}>
      {"Made with 💖 by "}
      {["NextJs", "TypeScript", "Supabase", "Cloudinary"].map(
        (author, index) => (
          <span key={index} className="font-ibm text-[#FF0B7A]">
            {author}
            {", "}
          </span>
        )
      )}
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="h-[24vh] text-center w-full flex flex-col gap-y-5 p-5 py-8">
      <div>
        <p className="mb-4 text-green-400 text-lg">
          Join the game, share the laughter!
        </p>
        <div className="flex justify-center items-center space-x-8">
          <Triangle className="w-8 h-8 text-pink-500 animate-bounce" />
          <Circle className="w-8 h-8 text-purple-500 animate-pulse" />
          <Square className="w-8 h-8 text-green-500 animate-spin" />
        </div>
      </div>
      <AuthorDetails />
    </footer>
  );
}

{
  /* <Link
  href="https://x.com/aykansal"
  className="text-[#FF0B7A] hover:underline"
  >
  Aykansal
  </Link>
  {" & "}
  <Link
  href="https://x.com/satyanshmittal"
  className="text-[#FF0B7A] hover:underline"
  >
  Satyansh
  </Link> */
}
