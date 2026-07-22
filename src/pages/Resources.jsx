import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ResourceHero from "../components/resources/ResourceHero";
import ResourceGrid from "../components/resources/ResourceGrid";
import FeaturedResources from "../components/resources/FeaturedResources";
import StatsSection from "../components/resources/StatsSection";
import YoutubeSection from "../components/resources/YoutubeSection";
import GitHubSection from "../components/resources/GitHubSection";
import CommunityCTA from "../components/resources/CommunityCTA";


export default function Resources() {

  return (

    <>
      <Navbar />

      <main className="bg-[#030712] text-white">

        <div className="max-w-7xl mx-auto px-6">

          <ResourceHero />

          <ResourceGrid />
          <StatsSection />
          <FeaturedResources />

          <YoutubeSection />

          <GitHubSection />

          <CommunityCTA />

        </div>

      </main>

      <Footer />

    </>

  );

}