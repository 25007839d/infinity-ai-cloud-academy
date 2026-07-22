import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { login } from "../services/adminService";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(formData.email, formData.password);

      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Infinity AI CRM
          </h1>

          <p className="text-slate-400 mt-3">
            Admin Login
          </p>

        </div>

        {error && (

          <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500 text-red-400 p-3 text-sm">

            {error}

          </div>

        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">

          {/* Email */}

          <div>

            <label className="block text-slate-300 mb-2">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@company.com"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 pl-12 pr-12 py-3 text-white focus:border-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 font-semibold transition ${
              loading
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}