// AboutPage.tsx
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        About Washington Trout Stats
      </h1>

      <p className="text-gray-600 text-lg mb-4">
        Welcome to Washington Trout Stats, a digital haven crafted for anglers
        and wildlife enthusiasts who cherish the bountiful waters of Washington
        State. As a software developer and avid angler, I've merged my technical
        expertise with my love for the outdoors to bring you this unique tool.
      </p>

      <p className="text-gray-600 text-lg mb-4">
        Our mission is to serve as a bridge, connecting you to the valuable data
        provided by the Washington Department of Fish and Wildlife (WDFW). This
        platform is not only about disseminating information but also about
        enhancing the angling experience for enthusiasts like you.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Diverse Species for Anglers
      </h2>

      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>
          Cutthroat Trout: Known for their distinctive red slashes near the
          throat.
        </li>
        <li>
          Brown Trout: Admired for their wariness and strength, offering a
          challenging fishing experience.
        </li>
        <li>
          Brook Trout: Often found in smaller streams, appreciated for their
          beautiful markings.
        </li>
        <li>
          Kokanee Salmon: Landlocked relatives of sockeye salmon, treasured for
          their taste and vibrant colors.
        </li>
        <li>
          Tiger Trout and Hybrid Species: Providing a diverse angling experience
          with their unique characteristics.
        </li>
      </ul>

      <p className="text-gray-600 text-lg mb-4">
        The fish stocking program in Washington is an effort in conservation and
        habitat management, aiming to balance ecosystems, support species
        recovery, and enhance recreational fishing.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Stocking for Sustainability
      </h2>

      <p className="text-gray-600 text-lg mb-4">
        By stocking various species, the WDFW is committed to maintaining the
        ecological balance in our lakes and rivers, often compensating for
        habitat changes or past overfishing. This initiative supports the health
        of Washington's aquatic ecosystems and provides a variety of species for
        anglers.
      </p>

      <p className="text-gray-600 text-lg mb-4">
        As a Full Stack Software Developer, I have created this app to bridge
        the gap between technology and nature. My goal is to foster a community
        space where anglers, conservationists, and nature enthusiasts can share
        experiences and knowledge.
      </p>

      <p className="text-gray-600 text-lg mb-4">
        If you're an organization looking for a developer who blends technology
        with environmental awareness, or an angler eager to share stories and
        insights, I'd love to connect. Let's work together to foster a
        sustainable and thriving future for Washington's aquatic habitats.
      </p>
    </div>
  );
};

export default AboutPage;
