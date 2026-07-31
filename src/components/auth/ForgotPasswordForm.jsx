import { useState } from "react";
import { resetPassword } from "../../services/authService";

export default function ForgotPasswordForm({
  onSwitchToLogin,
}) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await resetPassword(email);

      setMessage(
        "Password reset link has been sent to your email."
      );
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
          Email Address
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      {message && (
        <div className="rounded-lg bg-green-500/10 p-3 text-green-400 text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-cyan-400 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
}