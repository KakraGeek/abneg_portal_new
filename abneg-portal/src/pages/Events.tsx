import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Define a type for event data (adjust fields as needed)
type Event = {
  id: number;
  name: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  // Add more fields as needed based on your backend
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Fetch events from the backend API
    fetch("/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // RSVP handler
  const handleRSVP = async (eventId: number) => {
    if (!isAuthenticated) {
      window.alert("Please log in to RSVP for this event.");
      loginWithRedirect();
      return;
    }
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId,
          userId: user?.sub, // Auth0 user ID
          name: user?.name,
          email: user?.email,
        }),
      });
      if (res.ok) {
        window.alert("Successfully registered for the event!");
      } else if (res.status === 409) {
        window.alert("You have already registered for this event.");
      } else {
        window.alert("Failed to register. Please try again later.");
      }
    } catch (err) {
      window.alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🌍 ABNEG Events Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated on our upcoming webinars, conferences, training sessions, exhibitions, and community meetups. ABNEG events are curated to educate, connect, and empower agribusiness professionals across the globe.
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-gray-500">Loading events...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Events List */}
        {!loading && !error && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-700 mb-6">🗓️ Upcoming Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-600">No events found.</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-500"
                >
                  <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                  <ul className="text-gray-700 mb-2">
                    {event.date && <li><strong>Date:</strong> {event.date}</li>}
                    {event.time && <li><strong>Time:</strong> {event.time}</li>}
                    {event.location && <li><strong>Location:</strong> {event.location}</li>}
                    {event.description && <li><strong>Details:</strong> {event.description}</li>}
                  </ul>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
                    onClick={() => handleRSVP(event.id)}
                  >
                    RSVP
                  </button>
                </div>
              ))
            )}
          </section>
        )}
      </div>
    </div>
  );
} 