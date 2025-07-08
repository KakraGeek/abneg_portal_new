import React from "react";

const executiveCouncil = [
  { role: "Chairman", name: "Dr. Kwame Mensah" },
  { role: "1st Vice Chair", name: "Nana Akosua Asantewaa" },
  { role: "2nd Vice Chair", name: "Mr. Daniel Tetteh" },
  { role: "Secretary", name: "Ms. Joyce Boakye" },
  { role: "Financial Secretary", name: "Mr. Kofi Osei" },
  { role: "Organizer", name: "Mrs. Rita Adjei" },
  { role: "Protocol Officer", name: "Mr. Kojo Biney" },
  { role: "Regional Chairpersons", name: "One from each region" },
];

export default function Leadership() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Leadership Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each leader brings unique expertise and is committed to ABNEG’s mission of transforming agriculture through innovation, integrity, and collaboration.
          </p>
        </div>

        {/* Executive Council Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">Executive Council</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveCouncil.map((member) => (
              <div key={member.role} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border-l-4 border-green-500">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="text-3xl text-green-700 font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">{member.name}</h3>
                <div className="text-green-700 font-medium mb-2 text-center">{member.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Board of Directors Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">Board of Directors</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-xl border-l-4 border-blue-500">
              <p className="text-gray-700 mb-2">
                Appointed professionals from agribusiness, academia, diaspora, and finance
              </p>
              <p className="text-gray-600">
                Each leader brings unique expertise and is committed to ABNEG’s mission of transforming agriculture through innovation, integrity, and collaboration.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 