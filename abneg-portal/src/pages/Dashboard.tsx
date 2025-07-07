import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface MemberInfo {
  name: string;
  email: string;
  status: string;
  joinedAt: string;
  subscriptions: any[];
  phone: string;
  location: string;
}

export default function Dashboard() {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [member, setMember] = useState<MemberInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for edit profile form
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', location: '' });
  const [formStatus, setFormStatus] = useState<{ success: string | null; error: string | null }>({ success: null, error: null });

  // Loan status state
  const [loans, setLoans] = useState<any[]>([]);
  const [loansLoading, setLoansLoading] = useState(false);
  const [loansError, setLoansError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getAccessTokenSilently();
        const res = await fetch("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch member info");
        }
        const data = await res.json();
        setMember(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchMember();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoansLoading(true);
      setLoansError(null);
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch("/api/my-loans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch loans");
        }
        const data = await res.json();
        setLoans(data.loans);
      } catch (err: any) {
        setLoansError(err.message);
      } finally {
        setLoansLoading(false);
      }
    };
    if (isAuthenticated) fetchLoans();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Initialize form with member info when entering edit mode
  useEffect(() => {
    if (member && editMode) {
      setForm({
        name: member.name || '',
        phone: member.phone || '',
        location: member.location || '',
      });
    }
  }, [member, editMode]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ success: null, error: null });
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch('/api/members/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update profile');
      }
      setFormStatus({ success: 'Profile updated successfully!', error: null });
      setEditMode(false);
      // Refetch member info
      setLoading(true);
      const refreshed = await fetch('/api/members/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (refreshed.ok) {
        setMember(await refreshed.json());
      }
    } catch (err: any) {
      setFormStatus({ success: null, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <div className="text-center mt-10 text-blue-600">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }
  if (!member) {
    return <div className="text-center mt-10 text-gray-600">No member info found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500 mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Member Dashboard</h1>
          <div className="mb-4">
            <div className="text-lg font-semibold text-gray-900">Welcome, {member.name || "Member"}!</div>
            <div className="text-gray-600 text-sm">{member.email}</div>
          </div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              Status: {member.status}
            </span>
            <span className="ml-4 text-gray-500 text-sm">
              Joined: {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : "-"}
            </span>
          </div>
          {/* Edit Profile Button */}
          <div className="mb-4">
            {!editMode ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-sm font-medium"
                    onClick={() => { setEditMode(false); setFormStatus({ success: null, error: null }); }}
                  >
                    Cancel
                  </button>
                </div>
                {formStatus.success && <div className="text-green-600 text-sm">{formStatus.success}</div>}
                {formStatus.error && <div className="text-red-600 text-sm">{formStatus.error}</div>}
              </form>
            )}
          </div>
        </div>
        {/* Subscriptions Section (placeholder) */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Active Subscriptions</h2>
          {member.subscriptions && member.subscriptions.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700">
              {member.subscriptions.map((sub, idx) => (
                <li key={idx}>{JSON.stringify(sub)}</li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No active subscriptions found.</div>
          )}
        </div>
        {/* Loan Application Status Section */}
        {loansLoading ? (
          <div className="text-blue-600 text-center mt-6">Loading your loan applications...</div>
        ) : loansError ? (
          <div className="text-red-600 text-center mt-6">{loansError}</div>
        ) : loans && loans.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Loan Applications</h2>
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr>
                  <th className="px-3 py-2 border-b">Amount</th>
                  <th className="px-3 py-2 border-b">Purpose</th>
                  <th className="px-3 py-2 border-b">Repayment</th>
                  <th className="px-3 py-2 border-b">Status</th>
                  <th className="px-3 py-2 border-b">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-3 py-2 border-b">GHS {loan.amount}</td>
                    <td className="px-3 py-2 border-b">{loan.purpose}</td>
                    <td className="px-3 py-2 border-b">{loan.repaymentPeriod}</td>
                    <td className="px-3 py-2 border-b font-semibold capitalize">{loan.status}</td>
                    <td className="px-3 py-2 border-b">{new Date(loan.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
