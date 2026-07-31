import Badge from "../../ui/Badge";

export default function CourseHeader({ category, title, description }) {
  return (
    <>
      <Badge>{category}</Badge>

      <h3 className="mt-4 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </>
  );
}