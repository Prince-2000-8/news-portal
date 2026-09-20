import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore.js";
import Loader from "../components/Loader.jsx";

const categories = ["Politics", "Sports", "Technology", "Business", "Entertainment", "Health", "World", "Other"];

export default function EditNews() {
  const { id } = useParams();
  const { currentNews, fetchNewsById, updateNews, loading } = useNewsStore();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewsById(id);
  }, [id]);

  useEffect(() => {
    if (currentNews) {
      setForm({
        title: currentNews.title,
        summary: currentNews.summary,
        content: currentNews.content,
        image: currentNews.image,
        category: currentNews.category,
      });
    }
  }, [currentNews]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await updateNews(id, form);
    setSubmitting(false);
    if (res.success) {
      navigate(`/news/${id}`);
    } else {
      setError(res.message);
    }
  };

  if (loading || !form) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-3">Edit News Article</h1>

      {error && <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input name="title" required value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Summary</label>
          <textarea name="summary" rows="2" required value={form.summary} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
          <textarea name="content" rows="10" required value={form.content} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <button type="submit" disabled={submitting} className="w-full bg-brand text-white font-semibold py-2 rounded hover:bg-brand-dark disabled:opacity-60">
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
