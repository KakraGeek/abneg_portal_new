import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { z } from "zod";
import RoleBasedRoute from "../components/auth/RoleBasedRoute";

const loanSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be positive"),
  purpose: z.string().min(1, "Purpose is required"),
  repaymentPeriod: z.string().min(1, "Repayment period is required"),
  collateral: z.string().optional(),
  contact: z.string().min(1, "Contact is required"),
  location: z.string().min(1, "Location is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankBranch: z.string().min(1, "Bank branch is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  guarantorName: z.string().min(1, "Guarantor name is required"),
  guarantorContact: z.string().min(1, "Guarantor contact is required"),
  guarantorRelationship: z.string().min(1, "Guarantor relationship is required"),
});

export default function LoanApplication() {
  const { getAccessTokenSilently } = useAuth0();
  const [form, setForm] = useState({
    amount: "",
    purpose: "",
    repaymentPeriod: "",
    collateral: "",
    contact: "",
    location: "",
    bankName: "",
    bankBranch: "",
    accountNumber: "",
    guarantorName: "",
    guarantorContact: "",
    guarantorRelationship: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<{ success?: string; error?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({});
    // Validate with Zod
    const parsed = loanSchema.safeParse({
      amount: Number(form.amount),
      purpose: form.purpose,
      repaymentPeriod: form.repaymentPeriod,
      collateral: form.collateral,
      contact: form.contact,
      location: form.location,
      bankName: form.bankName,
      bankBranch: form.bankBranch,
      accountNumber: form.accountNumber,
      guarantorName: form.guarantorName,
      guarantorContact: form.guarantorContact,
      guarantorRelationship: form.guarantorRelationship,
    });
    if (!parsed.success) {
      const fieldErrors: any = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(form.amount),
          purpose: form.purpose,
          repaymentPeriod: form.repaymentPeriod,
          collateral: form.collateral,
          contact: form.contact,
          location: form.location,
          bankName: form.bankName,
          bankBranch: form.bankBranch,
          accountNumber: form.accountNumber,
          guarantorName: form.guarantorName,
          guarantorContact: form.guarantorContact,
          guarantorRelationship: form.guarantorRelationship,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit loan application");
      }
      setStatus({ success: "Loan application submitted successfully!" });
      setForm({
        amount: "",
        purpose: "",
        repaymentPeriod: "",
        collateral: "",
        contact: "",
        location: "",
        bankName: "",
        bankBranch: "",
        accountNumber: "",
        guarantorName: "",
        guarantorContact: "",
        guarantorRelationship: "",
      });
    } catch (err: any) {
      setStatus({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleBasedRoute requiredRole="member">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Loan Application</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (GHS)</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                min="1"
                step="1"
              />
              {errors.amount && <div className="text-red-600 text-sm mt-1">{errors.amount}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <textarea
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={2}
              />
              {errors.purpose && <div className="text-red-600 text-sm mt-1">{errors.purpose}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Repayment Period (months or date)</label>
              <input
                type="text"
                name="repaymentPeriod"
                value={form.repaymentPeriod}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. 12 months or 2025-06-01"
              />
              {errors.repaymentPeriod && <div className="text-red-600 text-sm mt-1">{errors.repaymentPeriod}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Collateral Offered</label>
              <input
                type="text"
                name="collateral"
                value={form.collateral}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Describe collateral (if any)"
              />
              {errors.collateral && <div className="text-red-600 text-sm mt-1">{errors.collateral}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.contact && <div className="text-red-600 text-sm mt-1">{errors.contact}</div>}
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
              {errors.location && <div className="text-red-600 text-sm mt-1">{errors.location}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.bankName && <div className="text-red-600 text-sm mt-1">{errors.bankName}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
              <input
                type="text"
                name="bankBranch"
                value={form.bankBranch}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.bankBranch && <div className="text-red-600 text-sm mt-1">{errors.bankBranch}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.accountNumber && <div className="text-red-600 text-sm mt-1">{errors.accountNumber}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guarantor Name</label>
              <input
                type="text"
                name="guarantorName"
                value={form.guarantorName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.guarantorName && <div className="text-red-600 text-sm mt-1">{errors.guarantorName}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guarantor Contact</label>
              <input
                type="text"
                name="guarantorContact"
                value={form.guarantorContact}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.guarantorContact && <div className="text-red-600 text-sm mt-1">{errors.guarantorContact}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guarantor Relationship</label>
              <input
                type="text"
                name="guarantorRelationship"
                value={form.guarantorRelationship}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.guarantorRelationship && <div className="text-red-600 text-sm mt-1">{errors.guarantorRelationship}</div>}
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            {status.success && <div className="text-green-600 text-sm mt-2">{status.success}</div>}
            {status.error && <div className="text-red-600 text-sm mt-2">{status.error}</div>}
          </form>
        </div>
      </div>
    </RoleBasedRoute>
  );
} 