import React, { useEffect, useState } from "react";
import RoleBasedRoute from "../components/auth/RoleBasedRoute";
import { useAuth0 } from "@auth0/auth0-react";

interface Loan {
  id: number;
  userId: number;
  amount: number;
  purpose: string;
  repaymentPeriod?: string;
  collateral?: string;
  contact?: string;
  location?: string;
  bankName?: string;
  bankBranch?: string;
  accountNumber?: string;
  guarantorName?: string;
  guarantorContact?: string;
  guarantorRelationship?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminLoanDashboard() {
  const { getAccessTokenSilently } = useAuth0();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<{ [id: number]: string }>({});

  const fetchLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("/api/loans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch loans");
      }
      const data = await res.json();
      setLoans(data.loans);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
    // eslint-disable-next-line
  }, []);

  const handleAction = async (id: number, status: string) => {
    setActionStatus((prev) => ({ ...prev, [id]: "loading" }));
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/loans/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update loan status");
      }
      setActionStatus((prev) => ({ ...prev, [id]: "success" }));
      fetchLoans();
    } catch (err: any) {
      setActionStatus((prev) => ({ ...prev, [id]: "error" }));
    }
  };

  // Sort: pending first, then by createdAt desc
  const sortedLoans = [...loans].sort((a, b) => {
    if (a.status === b.status) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (a.status === "pending") return -1;
    if (b.status === "pending") return 1;
    return 0;
  });

  return (
    <RoleBasedRoute requiredRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-green-700 mb-8">Loan Applications (Admin)</h1>
          {loading ? (
            <div className="text-blue-600">Loading loan applications...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr>
                    <th className="px-3 py-2 border-b">ID</th>
                    <th className="px-3 py-2 border-b">Amount</th>
                    <th className="px-3 py-2 border-b">Purpose</th>
                    <th className="px-3 py-2 border-b">Repayment</th>
                    <th className="px-3 py-2 border-b">Status</th>
                    <th className="px-3 py-2 border-b">Submitted</th>
                    <th className="px-3 py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLoans.map((loan) => (
                    <tr key={loan.id} className={loan.status === "pending" ? "bg-yellow-50" : ""}>
                      <td className="px-3 py-2 border-b text-center">{loan.id}</td>
                      <td className="px-3 py-2 border-b">GHS {loan.amount}</td>
                      <td className="px-3 py-2 border-b">{loan.purpose}</td>
                      <td className="px-3 py-2 border-b">{loan.repaymentPeriod}</td>
                      <td className="px-3 py-2 border-b font-semibold capitalize">{loan.status}</td>
                      <td className="px-3 py-2 border-b">{new Date(loan.createdAt).toLocaleString()}</td>
                      <td className="px-3 py-2 border-b">
                        {loan.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                              onClick={() => handleAction(loan.id, "approved")}
                              disabled={actionStatus[loan.id] === "loading"}
                            >
                              Approve
                            </button>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                              onClick={() => handleAction(loan.id, "rejected")}
                              disabled={actionStatus[loan.id] === "loading"}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {actionStatus[loan.id] === "loading" && <span className="text-blue-600 ml-2">Updating...</span>}
                        {actionStatus[loan.id] === "success" && <span className="text-green-600 ml-2">Updated!</span>}
                        {actionStatus[loan.id] === "error" && <span className="text-red-600 ml-2">Error!</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Details for each loan (expandable or below table) */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Application Details</h2>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Click a row to view full details (feature to be added)</li>
                  <li>All fields: collateral, contact, location, bank, guarantor, etc. are available in the backend response</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleBasedRoute>
  );
} 