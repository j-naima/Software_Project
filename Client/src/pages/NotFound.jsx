import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0f0d] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-glow -top-[150px] -right-[150px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-glow -bottom-[100px] -left-[100px] pointer-events-none" />

      <div className="card max-w-md w-full mx-4 p-9 text-center relative">
        <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
        <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
        <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
        <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[rgba(244,115,115,0.12)] rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-[#f47373]" />
          </div>
        </div>

        <h1
          className="text-6xl font-bold text-[#c8f5e0] mb-3"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          404
        </h1>
        <p className="text-lg text-[#7ab898] mb-2 font-medium">
          Page Not Found
        </p>
        <p className="text-sm text-[#5a8a72] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" />
          Return to Home
        </Link>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-[#00e560] to-transparent rounded-full opacity-60" />
      </div>
    </div>
  );
};

export default NotFound;
