import React from 'react';

// Contact page for ABNEG Portal
// This page displays office location, contact info, and quick links for email and WhatsApp

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-gray-700">Have questions or want to join the network?</p>

      {/* Head Office Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">📍 Head Office</h2>
        <p>Agric Business Network – Ghana (ABNEG)<br />Accra, Ghana</p>
      </div>

      {/* Phone Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">📞 Phone</h2>
        <a href="tel:+233201234567" className="text-blue-600 hover:underline">+233 20 123 4567</a>
      </div>

      {/* Email Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">📧 Email</h2>
        <a href="mailto:info@abneg.org" className="text-blue-600 hover:underline">info@abneg.org</a>
      </div>

      {/* WhatsApp Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">💬 Chat With Us</h2>
        {/* WhatsApp link using wa.me for direct chat */}
        <a
          href="https://wa.me/233201234567"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          WhatsApp Chat Support
        </a>
      </div>

      {/* Postal Address Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">📬 Postal Address</h2>
        <p>P.O. Box AN 321, Accra-North, Ghana</p>
      </div>

      {/* Embedded Map (Google Maps iframe) */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Map</h2>
        {/* Example: Google Maps embed for Accra, Ghana */}
        <div className="rounded overflow-hidden border shadow">
          <iframe
            title="ABNEG Head Office Map"
            src="https://www.google.com/maps?q=Accra,+Ghana&output=embed"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact; 