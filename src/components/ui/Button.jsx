import { Link } from "react-router-dom";

const variants = {
  primary:
    "site-btn site-btn-primary bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/20",

  secondary:
    "site-btn site-btn-secondary bg-slate-800 text-white hover:bg-slate-700",

  outline:
    "site-btn site-btn-outline border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white",

  success:
    "site-btn site-btn-success bg-green-600 text-white hover:bg-green-700",

  danger:
    "site-btn site-btn-danger bg-red-600 text-white hover:bg-red-700",

  ghost:
    "site-btn site-btn-ghost text-slate-300 hover:bg-slate-800",

  gray:
    "site-btn site-btn-secondary bg-slate-100 text-slate-700 hover:bg-slate-200",
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
    duration-200
    focus-visible:outline-none
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