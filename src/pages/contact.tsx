import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Contact Thomas Basham
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        I am a software developer based in the Greater Seattle Area. Feel free
        to reach out to me for any professional inquiries or collaborations.
      </p>
      <div className="mb-4">
        <p className="text-gray-600 text-lg">
          <strong>Name:</strong> Thomas Basham
        </p>
        <p className="text-gray-600 text-lg">
          <strong>Title:</strong> Software Developer
        </p>
        <p className="text-gray-600 text-lg">
          <strong>Location:</strong> Greater Seattle Area
        </p>
        <p className="text-gray-600 text-lg">
          <strong>Email:</strong>{" "}
          <a href="mailto:bashamtg@gmail.com" className="text-indigo-600">
            bashamtg@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
