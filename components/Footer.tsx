import { Circle, Square, Triangle } from 'lucide-react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="mt-auto w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-6 text-center">
          <p className="mb-4 text-green-400 font-medium text-lg">
            Join the game, share the laughter!
          </p>
          <div className="flex justify-center items-center space-x-10">
            <Triangle className="w-6 h-6 text-pink-500 animate-bounce" />
            <Circle className="w-6 h-6 text-purple-500 animate-pulse" />
            <Square className="w-6 h-6 text-green-500 animate-spin" />
          </div>
        </div>

        <div className="w-full max-w-2xl border-t border-gray-700 pt-5 mt-2"></div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium">Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span className="font-medium">by</span>
            <Link
              href="https://x.com/aykansal"
              className="font-medium text-pink-500 hover:text-pink-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aykansal
            </Link>
          </div>

          <Divider />

          <Link
            href="https://x.com/nftoodlehq"
            className="flex items-center gap-1.5 font-medium text-pink-500 hover:text-pink-400 transition-colors duration-200 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Follow on</span>
            <XIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          </Link>

          <Divider />

          <Link
            href="https://github.com/aykansal/nfun"
            className="flex items-center gap-1.5 font-medium text-pink-500 hover:text-pink-400 transition-colors duration-200 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>View Source</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

export const AuthorDetails = ({ className = '' }: { className: string }) => (
  <div
    className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3 text-sm text-gray-400 ${className}`}
  >
    <div className="flex items-center gap-2">
      <span className="font-medium">Made with</span>
      <span className="text-red-500 animate-pulse">❤️</span>
      <span className="font-medium">by</span>
      <Link
        href="https://x.com/aykansal"
        className="font-medium text-pink-500 hover:text-pink-400 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        Aykansal
      </Link>
    </div>

    <Divider />

    <Link
      href="https://x.com/nftoodlehq"
      className="flex items-center gap-1.5 font-medium text-pink-500 hover:text-pink-400 transition-colors duration-200 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Follow on</span>
      <XIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
    </Link>

    <Divider />

    <Link
      href="https://github.com/aykansal/nftoodle"
      className="flex items-center gap-1.5 font-medium text-pink-500 hover:text-pink-400 transition-colors duration-200 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
      <span>View Source</span>
    </Link>
  </div>
);

const Divider = () => (
  <div className="h-4 w-px bg-gray-600 mx-1 hidden sm:block" />
);

const XIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 1200 1227"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
  </svg>
);

const GithubIcon = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
