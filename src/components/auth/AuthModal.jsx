import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthModal({
  open,
  onClose,
  onSuccess,
}) {
  const [view, setView] = useState("login");

  useEffect(() => {
    if (open) {
      setView("login");
    }
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              Infinity AI Cloud Academy
            </h2>

            <p className="mt-2 text-slate-400">
              {view === "login" &&
                "Login to continue"}

              {view === "register" &&
                "Create your free account"}

              {view === "forgot" &&
                "Reset your password"}
            </p>
          </div>

          {view === "login" && (
            <LoginForm
              onSuccess={onSuccess}
              onSwitchToRegister={() =>
                setView("register")
              }
              onSwitchToForgot={() =>
                setView("forgot")
              }
            />
          )}

          {view === "register" && (
            <RegisterForm
              onSuccess={onSuccess}
              onSwitchToLogin={() =>
                setView("login")
              }
            />
          )}

          {view === "forgot" && (
            <ForgotPasswordForm
              onSwitchToLogin={() =>
                setView("login")
              }
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}