import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token: params.get("token"), password }),
      });
      setMessage("Password updated successfully. You can now login.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="mt-2 text-slate-400">Choose a new password.</p>
        <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-6 w-full rounded-xl bg-slate-800 p-4 outline-none" placeholder="New password" />
        {message && <p className="mt-4 rounded-xl bg-green-500/10 p-4 text-green-400">{message}</p>}
        {error && <p className="mt-4 rounded-xl bg-red-500/10 p-4 text-red-400">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold disabled:opacity-50">{loading ? "Updating..." : "Update Password"}</button>
      </form>
    </div>
  );
}
