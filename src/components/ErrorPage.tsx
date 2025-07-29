import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-8xl font-bold text-[#FF0B7A]">404</h1>
        <h2 className="text-2xl text-gray-300">Page Not Found</h2>
        <p className="text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="px-6 py-3 bg-[#FF0B7A] rounded-lg hover:bg-[#FF0B7A]/80 transition-colors">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
