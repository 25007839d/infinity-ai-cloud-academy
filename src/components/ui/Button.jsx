import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30",

  secondary:
    "bg-slate-800 text-white hover:bg-slate-700",

  outline:
    "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black",

  success:
    "bg-green-600 text-white hover:bg-green-700",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  ghost:
    "text-slate-300 hover:bg-slate-800",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-7 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  to,
  href,
  icon,
  iconRight,
  ...props
}) {
  const classes = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    font-semibold
    transition-all
    duration-300
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {icon}
        {children}
        {iconRight}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {icon}
        {children}
        {iconRight}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}