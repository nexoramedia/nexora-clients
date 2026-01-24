import React, { Suspense, useEffect } from "react";
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
  // Add smooth scroll behavior on component mount
  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = "smooth";

    // Remove smooth scroll when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0055aa, #0077dd);
          border-radius: 5px;
          border: 2px solid #0a0a0a;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0077dd, #0099ff);
        }

        /* For Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #0077dd #0a0a0a;
        }
      `}</style>

      {/* Navbar */}

      {/* Hero section */}
      <Suspense
        fallback={<div className="h-screen bg-gray-900 animate-pulse"></div>}
      >
        <NexoraHero />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ShowreelPlayer />
      </Suspense>

      {/* Other sections with individual loading states */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <CaseStudy />
      </Suspense> */}

      {/* <Suspense fallback={<SectionLoader />}>
        <WhyChooseUsSection />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <NextGenServicesSection />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <CoreService />
      </Suspense> */}

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
