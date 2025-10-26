import React, { Suspense } from "react";
import NexoraFaqs from "../../components/home/NexoraFaqs";

// Lazy load all components
const CosmicNavbar = React.lazy(() =>
  import("../../components/home/CosmicNavbar")
);
const NexoraHero = React.lazy(() => import("../../components/home/NexoraHero"));
const AboutSection = React.lazy(() =>
  import("../../components/home/AboutSection")
);
const ShowreelPlayer = React.lazy(() =>
  import("../../components/home/ShowreelPlayer")
);
const WhyChooseUsSection = React.lazy(() =>
  import("../../components/home/WhyChooseUsSection")
);
const NextGenServicesSection = React.lazy(() =>
  import("../../components/home/NextGenServicesSection")
);
const CosmicClientReviews = React.lazy(() =>
  import("../../components/home/CosmicClientReviews")
);
const CosmicContactSection = React.lazy(() =>
  import("../../components/home/CosmicContactSection")
);
const CosmicFooter = React.lazy(() =>
  import("../../components/home/CosmicFooter")
);

const CaseStudy = React.lazy(() => import("../../components/home/CaseStudy"));
const CoreService = React.lazy(() =>
  import("../../components/home/CoreService")
);

// Simple loading component
const SectionLoader = () => (
  <div className="h-20 bg-gray-900 rounded-lg animate-pulse"></div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar loads first since it's critical */}

      {/* Hero section */}
      <Suspense
        fallback={<div className="h-screen bg-gray-900 animate-pulse"></div>}
      >
        <NexoraHero />
      </Suspense>

      {/* Other sections with individual loading states */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ShowreelPlayer />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CaseStudy />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <WhyChooseUsSection />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <NextGenServicesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CoreService />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CosmicClientReviews />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <NexoraFaqs />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CosmicContactSection />
      </Suspense>
    </div>
  );
};

export default Home;
