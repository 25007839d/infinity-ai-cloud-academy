import clsx from "clsx";

const variants = {
  primary: "bg-cyan-500/10 text-cyan-400",
  success: "bg-green-500/10 text-green-400",
  warning: "bg-yellow-500/10 text-yellow-400",
  danger: "bg-red-500/10 text-red-400",
  info: "bg-blue-500/10 text-blue-400",
  purple: "bg-purple-500/10 text-purple-400",
  gray: "bg-slate-800 text-slate-300",
};

const sizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}