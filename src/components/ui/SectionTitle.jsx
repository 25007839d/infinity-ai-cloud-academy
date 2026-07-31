import clsx from "clsx";

export default function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className = "",
  children,
}) {
  return (
    <div
      className={clsx(
        "mb-14",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className
      )}
    >
      {badge && (
        <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
          {badge}
        </span>
      )}

      <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}