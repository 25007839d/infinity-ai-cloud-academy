import { useState } from "react";
import { signIn } from "../../services/authService";

export default function LoginForm({
  onSuccess,
  onSwitchToRegister,
  onSwitchToForgot,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
      await signIn(form.email, form.password);

      onSuccess?.();

    } catch (err) {
      setError(err.message);
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
        {loading ? "Signing In..." : "Login"}
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onSwitchToForgot}
          className="text-cyan-400 hover:underline"
        >
          Forgot Password?
        </button>

        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-cyan-400 hover:underline"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}