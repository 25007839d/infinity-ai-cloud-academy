export default function TechBadge({ tech }) {
  return (
    <span className="rounded-full bg-blue-900/40 border border-blue-500 px-3 py-1 text-sm text-cyan-300">
      {tech}
    </span>
  );
}