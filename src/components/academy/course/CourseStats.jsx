export default function CourseStats({
  duration,
  level,
  rating,
  projects,
}) {
  return (
    <div className="mt-6 space-y-2 text-sm text-slate-300">
      <div>📅 {duration}</div>
      <div>🎯 {level}</div>
      <div>⭐ {rating} Rating</div>
      <div>📂 {projects} Projects</div>
    </div>
  );
}