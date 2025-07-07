import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ABNEG Portal - Welcome!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            <strong>Agric Business Network - Ghana (ABNEG)</strong> is the nation's leading platform for uniting agricultural stakeholders. From farmers and agro-processors to policy experts and investors, ABNEG promotes innovation, inclusivity, and impact.
          </p>
          
          <div className="space-x-4">
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
              onClick={() => window.location.href = '/join'}
            >
              Become a Member
            </button>
            <button 
              className="border border-green-300 text-green-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-50"
              onClick={() => window.location.href = '/about'}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Empowering Section */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🌾 Empowering Ghana's Agro Sector
              </h2>
              <p className="text-lg text-gray-600">
                We connect local producers to global markets, support rural development, and advocate for smart agricultural policies.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            🧩 What We Offer
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Membership & Community</h3>
              <p className="text-gray-600">
                Join a network of agricultural professionals and stakeholders committed to Ghana's agricultural development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business & Investment Opportunities</h3>
              <p className="text-gray-600">
                Access funding, partnerships, and investment opportunities to grow your agricultural business.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Programs for Women & Youth</h3>
              <p className="text-gray-600">
                Specialized programs designed to empower women and youth in the agricultural sector.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Capacity Building and Training</h3>
              <p className="text-gray-600">
                Enhance your skills with our comprehensive training programs and capacity building initiatives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Access to Agro-Input Support and Loans</h3>
              <p className="text-gray-600">
                Get access to quality agricultural inputs and financial support to boost your farming operations.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-green-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">📢 Get Involved Today</h2>
            <p className="text-xl mb-6">
              Join a growing network committed to the future of agriculture in Ghana and beyond.
            </p>
            <button 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium"
              onClick={() => window.location.href = '/join'}
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 