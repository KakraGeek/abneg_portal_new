import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-green-600">ABNEG</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about our mission, vision, and the people behind Ghana's leading agribusiness network.
          </p>
        </div>

        {/* Who We Are Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who We Are</h2>
          <p className="text-gray-700">
            The <strong>Agric Business Network – Ghana (ABNEG)</strong> is a non-governmental, membership-based organization that brings together key stakeholders in the agricultural value chain.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To become the most progressive association offering sustainable marketing and financial solutions to farmers and agro-processors in Ghana and across Africa.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To promote impactful agribusiness by supporting stakeholders with resources, training, partnerships, and opportunities.
            </p>
          </div>
        </div>

        {/* Area of Operation Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-yellow-500">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Area of Operation</h3>
          <p className="text-gray-700">
            ABNEG works in all 16 regions of Ghana, with growing international membership and representation.
          </p>
        </div>

        {/* Our Origins Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Origins</h3>
          <p className="text-gray-700">
            Born out of the need to unify and empower Ghanaian agro-entrepreneurs, ABNEG was formed to drive policy, training, and technology in rural and urban agribusiness.
          </p>
        </div>

        {/* Legal & Governance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal & Governance</h3>
          <p className="text-gray-700">
            ABNEG is governed by its Constitution and Executive Council, and supported by a Board of Directors, Committees, and Regional Chapters.
          </p>
        </div>
      </div>
    </div>
  );
} 