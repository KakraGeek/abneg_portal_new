import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEO, SEO_CONFIGS } from '../components/SEO';

const Partnerships: React.FC = () => {
  // Set page title
  usePageTitle('Partnerships');
  
  return (
    <>
      <SEO {...SEO_CONFIGS.partnerships} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Partnerships & Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our network of agricultural stakeholders and explore collaborative opportunities for sustainable growth.
            </p>
          </div>

          {/* Join Our Network Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Join Our Network</h2>
            <p className="text-lg text-gray-700 mb-6 text-center">We collaborate with:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🏦 Financial Institutions</h3>
                <p className="text-gray-600">Access to agricultural financing and investment opportunities</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🌍 NGOs & Development Partners</h3>
                <p className="text-gray-600">Collaborative projects for sustainable development</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🔬 Agro-Tech Firms</h3>
                <p className="text-gray-600">Innovation and technology solutions for agriculture</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">💰 Local & Foreign Investors</h3>
                <p className="text-gray-600">Investment opportunities in Ghana's agricultural sector</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🏛️ Government Agencies</h3>
                <p className="text-gray-600">Policy support and regulatory collaboration</p>
              </div>
            </div>
          </section>

          {/* Current Opportunities Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Current Opportunities</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">📈 Commodity Exchange Platform</h3>
                <p className="text-gray-600 mb-3">Open call for investment in ABNEG's Commodity Exchange Platform</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Investment Opportunity</span>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🌱 National Youth Farm Incubator Project</h3>
                <p className="text-gray-600 mb-3">Partnership opportunity for youth agricultural development</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Partnership Opportunity</span>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🌾 Agro-Input Distribution</h3>
                <p className="text-gray-600 mb-3">Agro-Input Distribution for 2025 season</p>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Seasonal Opportunity</span>
              </div>
            </div>
          </section>

          {/* Why Partner with ABNEG Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Why Partner with ABNEG?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Rural & National Reach</h3>
                <p className="text-gray-600">Established presence across Ghana's agricultural communities</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Strong Membership Base</h3>
                <p className="text-gray-600">Diverse network of farmers, processors, and stakeholders</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable & Inclusive Growth</h3>
                <p className="text-gray-600">Focus on long-term, environmentally conscious development</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Partner?</h2>
              <p className="text-gray-600 mb-6">
                Contact our Secretariat to explore partnership models and discuss collaboration opportunities.
              </p>
              <a
                href="/contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow transition-colors"
              >
                Contact Our Secretariat
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Partnerships; 