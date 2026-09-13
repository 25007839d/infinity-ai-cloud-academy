import { useState } from "react";
import { signUp } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await signUp(
        form.email,
        form.password,
        {
          full_name: form.fullName,
          phone: form.phone,
        }
      );

      setUser(user);
      onSuccess?.();

    } catch (err) {
  console.error("Signup Error:", err);
  console.error("Message:", err.message);
  console.error("Full Error:", JSON.stringify(err, null, 2));

  setError(err.message || "Something went wrong.");
  } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          required
          value={form.fullName}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Mobile Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          value={form.phone}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
          placeholder="10-digit mobile number"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />
        <p className="mt-1 text-xs text-slate-500">Example: 9876543210</p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          type="password"
          name="password"
          required
          minLength={8}
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-cyan-400 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </form>
  );
}