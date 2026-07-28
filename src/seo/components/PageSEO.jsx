import { SEO, StructuredData } from "../";
import buildMeta from "../utils/buildMeta";

export default function PageSEO(props) {
  const meta = buildMeta(props);

  return (
    <>
      <SEO {...meta} />
      <StructuredData />
    </>
  );
}