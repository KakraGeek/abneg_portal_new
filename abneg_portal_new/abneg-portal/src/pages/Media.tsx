import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { SEO, SEO_CONFIGS } from '../components/SEO';

const Media: React.FC = () => {
  // Set page title
  usePageTitle('Media & Gallery');
  
  return (
    <>
      <SEO {...SEO_CONFIGS.media} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Media & Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our latest blog articles, videos, and photo gallery showcasing ABNEG's impact on Ghana's agricultural sector.
            </p>
          </div>

          {/* Latest Blog Articles Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Latest Blog Articles</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <a href="#" className="hover:text-green-600 transition-colors">
                    5 Ways ABNEG is Driving Innovation in Rural Farming
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover how ABNEG is revolutionizing agricultural practices in rural communities through innovative approaches and technology adoption.
                </p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Innovation</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    How to Access ABNEG's Agro-Input Subsidy Program
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide for farmers on accessing ABNEG's subsidized agricultural inputs and support programs.
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Support</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <a href="#" className="hover:text-purple-600 transition-colors">
                    Meet the Women Transforming Agribusiness in Ghana
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">
                  Inspiring stories of women entrepreneurs who are leading the transformation of Ghana's agricultural sector through ABNEG.
                </p>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Women in Agriculture</span>
              </div>
            </div>
          </section>

          {/* Videos Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">🎥 Videos</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AGM 2024 Highlights</h3>
                  <p className="text-gray-600">Highlights from our Annual General Meeting showcasing key achievements and future plans.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">📈</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Stories: From Farm to Export</h3>
                  <p className="text-gray-600">Inspiring stories of farmers who have successfully expanded from local farming to international exports.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">💬</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Member Testimonials</h3>
                  <p className="text-gray-600">Hear directly from our members about how ABNEG has transformed their agricultural businesses.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">📸 Photo Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">👨‍🌾</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Farmer Training Sessions</h3>
                  <p className="text-gray-600 text-sm">Photos from our comprehensive training programs for farmers across Ghana.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">🤝</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">International Partnerships</h3>
                  <p className="text-gray-600 text-sm">Documenting our collaborations with international organizations and partners.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">👩‍🌾</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Women in Agriculture Events</h3>
                  <p className="text-gray-600 text-sm">Celebrating the contributions of women in Ghana's agricultural sector.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">🌾</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Harvest Celebrations</h3>
                  <p className="text-gray-600 text-sm">Joyful moments from successful harvest seasons across our member farms.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">🏢</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Conference & Workshops</h3>
                  <p className="text-gray-600 text-sm">Highlights from our educational conferences and capacity-building workshops.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-4xl">🌱</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainable Practices</h3>
                  <p className="text-gray-600 text-sm">Showcasing sustainable agricultural practices and environmental initiatives.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h2>
              <p className="text-gray-600 mb-6">
                Follow us for the latest updates, stories, and insights from Ghana's agricultural sector.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Subscribe to Newsletter
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Follow on Social Media
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Media; 