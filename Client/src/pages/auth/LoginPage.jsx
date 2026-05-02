import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { BookOpen, Loader } from "lucide-react";

const ROLES = ["Student", "Teacher", "Admin"];

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn, authUser } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Student",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    dispatch(login(data));
  };

  useEffect(() => {
    if (authUser) {
      const routes = {
        Student: "/student",
        Teacher: "/teacher",
        Admin: "/admin",
      };
      navigate(routes[formData.role] || "/login");
    }
  }, [authUser, navigate, formData.role]);

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
            <BookOpen size={24} color="#0a0f0d" strokeWidth={2.5} />
          </div>
          <h1 className="card-title text-xl text-center leading-tight">
            AcadTrack - Project
            <br />
            Management
          </h1>
          <p className="card-subtitle">Sign in to continue</p>
        </div>

        <div className="grid grid-cols-3 bg-[#0c1210] border border-[rgba(0,229,96,0.15)] rounded-xl p-1 mb-6">
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                formData.role === role
                  ? "bg-[rgba(0,229,96,0.12)] text-[#00e560] border border-[rgba(0,229,96,0.3)] shadow-[0_0_12px_rgba(0,229,96,0.1)]"
                  : "text-[#5a8a72] hover:text-[#8ab8a0] bg-transparent border border-transparent"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, role }))}
            >
              {role}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-[rgba(50,15,15,0.9)] border border-[rgba(240,71,71,0.35)] rounded-xl px-4 py-2.5 mb-5 text-xs text-[#f47373] font-medium">
              {errors.general}
            </div>
          )}

          <div className="mb-[18px]">
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`input${errors.email ? " input-error" : ""}`}
            />
            {errors.email && (
              <p className="text-[11px] text-[#f47373] mt-1.5 font-medium">
                ⚠ {errors.email}
              </p>
            )}
          </div>

          <div className="mb-[18px]">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input${errors.password ? " input-error" : ""}`}
            />
            {errors.password && (
              <p className="text-[11px] text-[#f47373] mt-1.5 font-medium">
                ⚠ {errors.password}
              </p>
            )}
          </div>

          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-xs text-[#5a8a72] hover:text-[#00e560] font-semibold no-underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn-primary w-full"
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                Signing in...
              </span>
            ) : (
              `Sign in as ${formData.role}`
            )}
          </button>
        </form>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-[#00e560] to-transparent rounded-full opacity-60" />
      </div>
    </div>
  );
};

export default LoginPage;
