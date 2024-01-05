// AboutPage.tsx
import React from "react";
import Image from "next/image";
import troutImage from "public/trout_image.png";
import rainbowTrout from "public/rainbow_trout.jpg";
import steelheadTrout from "public/steelhead_trout.jpg";
import cutthroatTrout from "public/cutthroat_trout.jpg";
const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        About Trout Tracker WA
      </h1>

      <Image
        src={troutImage}
        alt="Scenic Washington State landscape with various trout species"
        layout="responsive"
      />

      <section className="text-gray-600 text-lg mb-4">
        <p>
          Welcome to Trout Tracker WA, a digital haven crafted for anglers and
          wildlife enthusiasts who cherish the bountiful waters of Washington
          State. As a software developer and avid angler, I've merged my
          technical expertise with my love for the outdoors to bring you this
          unique tool.
        </p>

        <p>
          Our mission is to serve as a bridge, connecting you to the valuable
          data provided by the Washington Department of Fish and Wildlife
          (WDFW). This platform is not only about disseminating information but
          also about enhancing the angling experience for enthusiasts like you.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Diverse Species for Anglers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="species-card">
            <Image
              src={rainbowTrout}
              alt="Rainbow Trout"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Rainbow Trout</h3>
            <p>Popular for their striking coloration and spirited nature.</p>
          </div>
          <div className="species-card">
            <Image
              src={steelheadTrout}
              alt="Steelhead"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Steelhead</h3>
            <p>
              A migratory form of the rainbow trout, renowned for their size and
              fighting ability.
            </p>
          </div>
          <div className="species-card">
            <Image
              src={cutthroatTrout}
              alt="Cutthroat Trout"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Cutthroat Trout</h3>
            <p>Known for their distinctive red slashes near the throat.</p>
          </div>
          {/* <div className="species-card">
            <Image
              src="/path-to-brown-trout-image.jpg"
              alt="Brown Trout"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Brown Trout</h3>
            <p>
              Admired for their wariness and strength, offering a challenging
              fishing experience.
            </p>
          </div>
          <div className="species-card">
            <Image
              src="/path-to-brook-trout-image.jpg"
              alt="Brook Trout"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Brook Trout</h3>
            <p>
              Often found in smaller streams, appreciated for their beautiful
              markings.
            </p>
          </div>
          <div className="species-card">
            <Image
              src="/path-to-kokanee-salmon-image.jpg"
              alt="Kokanee Salmon"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Kokanee Salmon</h3>
            <p>
              Landlocked relatives of sockeye salmon, treasured for their taste
              and vibrant colors.
            </p>
          </div>
          <div className="species-card">
            <Image
              src="/path-to-tiger-trout-image.jpg"
              alt="Tiger Trout"
              className="species-image"
              layout="responsive"
            />
            <h3 className="species-name">Tiger Trout and Hybrid Species</h3>
            <p>
              Providing a diverse angling experience with their unique
              characteristics.
            </p>
          </div> */}
        </div>
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
          As a Full Stack Software Developer, I have created this app to bridge
          the gap between technology and nature. My goal is to foster a
          community space where anglers, conservationists, and nature
          enthusiasts can share experiences and knowledge.
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
