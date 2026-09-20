import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useNewsStore } from "../store/newsStore.js";

export default function Dashboard() {
  const { user, updateProfile, loading: authLoading } = useAuthStore();
  const { myNews, fetchMyNews, deleteNews, loading: newsLoading } = useNewsStore();

  const [form, setForm] = useState({ name: "", bio: "", avatar: "", password: "" });
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("news");

  useEffect(() => {
    fetchMyNews();
    if (user) {
      setForm({ name: user.name || "", bio: user.bio || "", avatar: user.avatar || "", password: "" });
    }
  }, [user?._id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = { name: form.name, bio: form.bio, avatar: form.avatar };
    if (form.password) payload.password = form.password;

    const res = await updateProfile(payload);
    setMessage(res.success ? "Profile updated successfully" : res.message);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news article?")) return;
    await deleteNews(id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 border-l-4 border-brand pl-3">My Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setTab("news")}
          className={`pb-2 px-1 font-semibold ${tab === "news" ? "border-b-2 border-brand text-brand" : "text-gray-500"}`}
        >
          My News
        </button>
        <button
          onClick={() => setTab("profile")}
          className={`pb-2 px-1 font-semibold ${tab === "profile" ? "border-b-2 border-brand text-brand" : "text-gray-500"}`}
        >
          Profile Settings
        </button>
      </div>

      {tab === "news" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{myNews.length} article(s) published</p>
            <Link to="/create-news" className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark text-sm font-semibold">
              + Publish New Article
            </Link>
          </div>

          {newsLoading ? (
            <p>Loading...</p>
          ) : myNews.length === 0 ? (
            <p className="text-gray-500">You haven't published any news yet.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3">Published</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myNews.map((n) => (
                    <tr key={n._id} className="border-t">
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">
                        <Link to={`/news/${n._id}`} className="hover:text-brand">{n.title}</Link>
                      </td>
                      <td className="px-4 py-3">{n.category}</td>
                      <td className="px-4 py-3">{n.views}</td>
                      <td className="px-4 py-3">{new Date(n.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 flex gap-3">
                        <Link to={`/edit-news/${n._id}`} className="text-blue-600 hover:underline">Edit</Link>
                        <button onClick={() => handleDelete(n._id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "profile" && (
        <div className="max-w-lg">
          {message && <p className="bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded mb-4">{message}</p>}
          <form onSubmit={handleProfileSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input value={user?.email || ""} disabled className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea name="bio" rows="3" value={form.bio} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Image URL</label>
              <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <button type="submit" disabled={authLoading} className="w-full bg-brand text-white font-semibold py-2 rounded hover:bg-brand-dark disabled:opacity-60">
              {authLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
