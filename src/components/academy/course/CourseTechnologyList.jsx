import Badge from "../../ui/Badge";

export default function CourseTechnologyList({ technologies = [] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {technologies.slice(0, 5).map((tech) => (
        <Badge
          key={tech}
          variant="gray"
          size="sm"
        >
          {tech}
        </Badge>
      ))}
    </div>
  );
}