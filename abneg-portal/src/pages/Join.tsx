import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Join() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a <span className="text-green-600">Member</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join the Agric Business Network – Ghana (ABNEG) and connect with a vibrant community of farmers, agro-processors, investors, and innovators shaping the future of agriculture in Ghana and beyond.
          </p>
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Join ABNEG?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access to a strong network of agricultural professionals and stakeholders</li>
            <li>Business &amp; investment opportunities</li>
            <li>Specialized programs for women &amp; youth</li>
            <li>Capacity building and training sessions</li>
            <li>Support with agro-inputs and loans</li>
            <li>Opportunities to participate in events, workshops, and conferences</li>
            <li>Be part of a movement driving innovation and policy in Ghanaian agriculture</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          {!isAuthenticated ? (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow"
              onClick={() => loginWithRedirect()}
            >
              Join Now
            </button>
          ) : (
            <span className="text-green-700 font-semibold text-lg">You are already a member!</span>
          )}
        </div>
      </div>
    </div>
  );
} 