import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";
import { forgotPassword } from "../../store/slices/authSlice";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState("");
  const [error, setError] = useState("");
  const { isRequestingForToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }

    setError("");

    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      setError(error || "Failed to send reset link. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-glow -top-[150px] -right-[150px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-glow -bottom-[100px] -left-[100px] pointer-events-none" />

        <div className="card max-w-md w-full p-9 relative">
          <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
          <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
          <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
          <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />

          <div className="flex flex-col items-center mb-7">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00e560] to-[#009940] flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(0,229,96,0.4)]">
              <svg
                fill="none"
                stroke="#0a0f0d"
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="card-title text-xl">Check Your Email</h1>
            <p className="card-subtitle">
              We've sent a password reset link to your email address.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#7ab898] mb-5">
              If an account with{" "}
              <strong className="text-[#c8f5e0]">{email}</strong> exists, you
              will receive a password reset email shortly.
            </p>
            <div className="space-y-3">
              <Link
                to="/login"
                className="btn-primary block text-center no-underline"
              >
                Back to Login
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="btn-outline w-full"
              >
                Send Another Email
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-[#00e560] to-transparent rounded-full opacity-60" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-glow -top-[150px] -right-[150px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-glow -bottom-[100px] -left-[100px] pointer-events-none" />

      <div className="card max-w-md w-full p-9 relative">
        <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
        <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
        <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />
        <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[rgba(0,229,96,0.5)]" />

        <div className="flex flex-col items-center mb-7">
          <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#00e560] to-[#009940] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,229,96,0.4)]">
            <KeyRound size={24} color="#0a0f0d" strokeWidth={2.5} />
          </div>
          <h1 className="card-title text-xl">Forgot Password?</h1>
          <p className="card-subtitle">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-[rgba(50,15,15,0.9)] border border-[rgba(240,71,71,0.35)] rounded-xl px-4 py-2.5 mb-5 text-xs text-[#f47373] font-medium">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="you@example.com"
              className={`input${error ? " input-error" : ""}`}
              disabled={isRequestingForToken}
            />
            {error && (
              <p className="text-[11px] text-[#f47373] mt-1.5 font-medium">
                ⚠ {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isRequestingForToken}
            className="btn-primary w-full"
          >
            {isRequestingForToken ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-xs text-[#5a8a72] hover:text-[#00e560] font-semibold no-underline"
          >
            Back to Sign In
          </Link>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-[#00e560] to-transparent rounded-full opacity-60" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
