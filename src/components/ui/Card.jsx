import clsx from "clsx";

const variants = {
  default:
    "bg-slate-900 border border-slate-800",

  glass:
    "bg-slate-900/70 backdrop-blur-xl border border-slate-800",

  outline:
    "bg-transparent border border-cyan-500",

  gradient:
    "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700",
};

const padding = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  variant = "default",
  spacing = "md",
  hover = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        padding[spacing],
        hover &&
          "hover:-translate-y-2 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}