// AboutPage.tsx
import React from "react";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        About Troutlytics
      </h1>
      <section className="text-gray-600 text-lg mb-4">
        <p>
          Troutlytics is your ultimate resource for stocked trout data in
          Washington State. Whether you're a seasoned angler or a beginner, our
          platform provides valuable information to enhance your fishing
          experience.
        </p>
        <p>
          Our mission is to offer comprehensive guides, tips, and real-time
          updates on stocked trout fishing locations, species, and regulations.
          We aim to foster a community of passionate anglers who share their
          experiences and knowledge.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Stocking for Sustainability
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          The fish stocking program in Washington is an effort in conservation
          and habitat management, aiming to balance ecosystems, support species
          recovery, and enhance recreational fishing.
        </p>
        <p className="text-gray-600 text-lg mb-4">
          By stocking various species, the WDFW is committed to maintaining the
          ecological balance in our lakes and rivers, often compensating for
          habitat changes or past overfishing. This initiative supports the
          health of Washington's aquatic ecosystems and provides a variety of
          species for anglers.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          As a Software Developer, I created this app to bridge the gap between
          technology and nature. My goal is to foster a community space where
          anglers, conservationists, and nature enthusiasts can share
          experiences and knowledge.
        </p>

        <p className="text-gray-600 text-lg mb-4">
          If you're an organization looking for a developer who blends
          technology with environmental awareness, or an angler eager to share
          stories and insights, I'd love to connect. Let's work together to
          foster a sustainable and thriving future for Washington's aquatic
          habitats.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
