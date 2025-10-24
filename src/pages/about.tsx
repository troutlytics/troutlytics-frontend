// AboutPage.tsx
import React from "react";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="container px-4 pb-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        About Troutlytics
      </h1>
      <section className="mb-4 text-lg text-gray-600">
        <p>
          Troutlytics was created to help inspire anglers and soon-to-be anglers
          to get out and enjoy our communities resources and to keep pressure
          off endangered salmon and steelhead runs.
        </p>
        <p>
          Our mission is to offer more insight into the WDFW trout stocking
          programs, saving anglers time by finding the most recent stocked trout
          in lakes nearby.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Stocking for Sustainability
        </h2>
        <p className="mb-4 text-lg text-gray-600">
          The fish stocking program in Washington is an effort in conservation
          and habitat management, aiming to balance ecosystems, support species
          recovery, and enhance recreational fishing. This is a sustainable
          resource we all own and should take advantage of.
        </p>
        <p className="mb-4 text-lg text-gray-600">
          By stocking various species, the WDFW is committed to maintaining the
          ecological balance in our lakes and rivers, often compensating for
          habitat changes or past overfishing. This initiative supports the
          health of Washington's aquatic ecosystems and provides a variety of
          species for anglers to catch.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Join Our Community
        </h2>
        <p className="mb-4 text-lg text-gray-600">
          As a Software Developer, I created this app to bridge the gap between
          technology and nature. My goal is to foster a community space where
          anglers, conservationists, and nature enthusiasts can share
          experiences and knowledge.
        </p>

        <p className="mb-4 text-lg text-gray-600">
          If you're an organization looking for a developer who blends
          technology with environmental awareness, or an angler eager to share
          stories and insights, I'd love to connect. Let's work together to
          create a sustainable and thriving future for Washington's aquatic
          habitats.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
