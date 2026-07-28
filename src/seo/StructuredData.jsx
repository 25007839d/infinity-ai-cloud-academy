import OrganizationSchema from "./schemas/OrganizationSchema";
import WebsiteSchema from "./schemas/WebsiteSchema";

export default function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />

      {/* Future Schemas */}
      {/* <LocalBusinessSchema /> */}
      {/* <PersonSchema /> */}
      {/* <FAQSchema /> */}
    </>
  );
}