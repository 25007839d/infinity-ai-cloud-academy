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
      <Navbar />

      <main className="bg-[#030712] text-white">

        <ContactHero />

        <ContactForm />

        <ContactInfo />

        <SocialLinks />

        <QuickActions />

      </main>

      <Footer />
    </>
  );
}