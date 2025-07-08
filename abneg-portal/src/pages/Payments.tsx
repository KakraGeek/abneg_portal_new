import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Extend the Window interface to include FlutterwaveCheckout for TypeScript
declare global {
  interface Window {
    FlutterwaveCheckout?: any;
  }
}

// Utility to dynamically load the Flutterwave script
function useFlutterwaveScript() {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById("flutterwave-sdk")) return;
    const script = document.createElement("script");
    script.id = "flutterwave-sdk";
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // Optionally remove script on unmount
      // document.body.removeChild(script);
    };
  }, []);
}

// Example data for Membership Dues (usually just one item)
const membershipDues = [
  {
    id: "dues-2024",
    name: "2024 Annual Membership Dues",
    description: "Pay your annual membership fee for 2024.",
    price: 100, // GHS
  },
];

// Example data for Subscriptions (multiple resources)
const subscriptions = [
  {
    id: "sub-newsletter",
    name: "Premium Newsletter",
    description: "Monthly in-depth industry analysis.",
    price: 20,
  },
  {
    id: "sub-digital-library",
    name: "Digital Library Access",
    description: "Unlimited access to our digital resources.",
    price: 50,
  },
  // Add more as needed
];

const Payments: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    // Optionally show a loading spinner or nothing while checking auth
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    loginWithRedirect();
    return null; // Don't render the page
  }

  useFlutterwaveScript();

  // State to track selected items (cart)
  const [cart, setCart] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Handler for checkbox changes
  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setCart((prevCart) =>
      checked ? [...prevCart, itemId] : prevCart.filter((id) => id !== itemId)
    );
  };

  // Helper to check if an item is in the cart
  const isChecked = (itemId: string) => cart.includes(itemId);

  // Mock payment modal handler
  const handlePayment = () => {
    setShowModal(true);
  };

  // Simulate payment result
  const simulatePayment = (result: "success" | "failure") => {
    setVerifying(true);
    // Simulate backend verification delay
    setTimeout(() => {
      setVerifying(false);
      setShowModal(false);
      if (result === "success") {
        alert("Mock payment verified and recorded! (UI/UX test)");
        setCart([]); // Clear cart
      } else {
        alert("Mock payment failed. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      {/* Membership Dues Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Membership Dues</h2>
        {membershipDues.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={item.id}
              checked={isChecked(item.id)}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={item.id} className="flex-1">
              <span className="font-medium">{item.name}</span> – GHS {item.price}
              <br />
              <span className="text-gray-600 text-sm">{item.description}</span>
            </label>
          </div>
        ))}
      </section>

      {/* Subscriptions Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
        {subscriptions.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={item.id}
              checked={isChecked(item.id)}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={item.id} className="flex-1">
              <span className="font-medium">{item.name}</span> – GHS {item.price}
              <br />
              <span className="text-gray-600 text-sm">{item.description}</span>
            </label>
          </div>
        ))}
      </section>

      {/* Cart Summary Section */}
      <section className="mb-8 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items selected.</p>
        ) : (
          <ul className="mb-2">
            {cart.map((itemId) => {
              // Find the item in either membershipDues or subscriptions
              const item =
                membershipDues.find((i) => i.id === itemId) ||
                subscriptions.find((i) => i.id === itemId);
              if (!item) return null;
              return (
                <li key={item.id}>
                  {item.name} – GHS {item.price}
                </li>
              );
            })}
          </ul>
        )}
        <div className="font-bold mb-2">
          Total: GHS{" "}
          {cart
            .map(
              (itemId) =>
                (membershipDues.find((i) => i.id === itemId) ||
                  subscriptions.find((i) => i.id === itemId))?.price || 0
            )
            .reduce((sum, price) => sum + price, 0)}
        </div>
        <button
          onClick={handlePayment}
          disabled={cart.length === 0}
          className={`px-6 py-2 rounded ${
            cart.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-700 text-white hover:bg-green-800 transition"
          }`}
        >
          Proceed to Checkout
        </button>
      </section>

      {/* Mock Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Mock Payment Modal</h2>
            <p className="mb-4">Simulate a payment result for UI/UX testing.</p>
            <div className="flex gap-4">
              <button
                onClick={() => simulatePayment("success")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={verifying}
              >
                Simulate Success
              </button>
              <button
                onClick={() => simulatePayment("failure")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={verifying}
              >
                Simulate Failure
              </button>
            </div>
            {verifying && <div className="mt-4 text-blue-600">Verifying payment...</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments; 