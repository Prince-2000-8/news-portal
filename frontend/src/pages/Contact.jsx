import { useState } from "react";
import api from "../api/axios.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 border-l-4 border-brand pl-3">Contact Us</h1>
      <p className="text-gray-600 mb-8 pl-4">Have questions, feedback, or a news tip? Send us a message.</p>

      {status === "success" && (
        <p className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded mb-4">
          Thank you! Your message has been sent.
        </p>
      )}
      {status && status !== "success" && (
        <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded mb-4">{status}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" rows="5" required value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <button type="submit" disabled={submitting} className="w-full bg-brand text-white font-semibold py-2 rounded hover:bg-brand-dark disabled:opacity-60">
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
