import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";
import { resetPassword } from "../../store/slices/authSlice";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isUpdatingPassword } = useSelector((state) => state.auth);
  const token = searchParams.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        resetPassword({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      ).unwrap();

      navigate("/login");
    } catch (error) {
      setErrors({
        general: error || "Failed to reset password. Please try again.",
      });
    }
  };

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
          <h1 className="card-title text-xl">Reset Password</h1>
          <p className="card-subtitle">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-[rgba(50,15,15,0.9)] border border-[rgba(240,71,71,0.35)] rounded-xl px-4 py-2.5 mb-5 text-xs text-[#f47373] font-medium">
              {errors.general}
            </div>
          )}

          <div className="mb-5">
            <label className="label">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className={`input${errors.password ? " input-error" : ""}`}
            />
            {errors.password && (
              <p className="text-[11px] text-[#f47373] mt-1.5 font-medium">
                ⚠ {errors.password}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              className={`input${errors.confirmPassword ? " input-error" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="text-[11px] text-[#f47373] mt-1.5 font-medium">
                ⚠ {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="btn-primary w-full"
          >
            {isUpdatingPassword ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                Resetting...
              </span>
            ) : (
              "Reset Password"
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

export default ResetPasswordPage;
