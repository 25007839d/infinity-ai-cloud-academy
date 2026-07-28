import SEO from "../seo/SEO";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import SocialLinks from "../components/contact/SocialLinks";
import QuickActions from "../components/contact/QuickActions";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Infinity AI Cloud Academy"
        description="Contact Infinity AI Cloud Academy for course enquiries, free demo classes, career guidance, mentorship, admission support, placement assistance, and training in Data Engineering, AI, Cloud Computing, Python, SQL, PySpark, GCP, AWS and Generative AI."
        keywords={[
          "Contact Infinity AI Cloud Academy",
          "Contact AI Training Institute",
          "Data Engineering Institute Contact",
          "Book Free Demo",
          "Course Enquiry",
          "Career Guidance",
          "Placement Assistance",
          "Data Engineering Training",
          "AI Training",
          "Cloud Computing Course",
          "Python Course",
          "SQL Course",
          "PySpark Training",
          "GCP Training",
          "AWS Training",
          "Generative AI Course",
          "Technical Support",
          "Student Support",
        ]}
        url="https://infinityaicloudacademy.com/contact"
      />

      <Navbar />

      <main className="bg-[#030712] text-white">
        <ContactHero />

        <ContactInfo />

        <SocialLinks />

        <QuickActions />

        {/* Uncomment if Contact Form is added later */}
        {/* <ContactForm /> */}
      </main>

      <Footer />
    </>
  );
}