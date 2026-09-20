import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNewsStore } from "../store/newsStore.js";
import Loader from "../components/Loader.jsx";

const FALLBACK_IMAGE = "https://placehold.co/1000x500?text=News";

export default function NewsDetails() {
  const { id } = useParams();
  const { currentNews, fetchNewsById, loading, error } = useNewsStore();

  useEffect(() => {
    fetchNewsById(id);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) return <Loader />;
  if (error || !currentNews) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">{error || "News not found."}</p>
        <Link to="/news" className="text-brand hover:underline">Back to news</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand">{currentNews.category}</span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">{currentNews.title}</h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
        <span>By {currentNews.author?.name || "Staff Writer"}</span>
        <span>•</span>
        <span>{new Date(currentNews.createdAt).toLocaleString()}</span>
        <span>•</span>
        <span>{currentNews.views} views</span>
      </div>

      <img
        src={currentNews.image || FALLBACK_IMAGE}
        alt={currentNews.title}
        className="w-full h-80 object-contain bg-gray-50 rounded-lg mb-6"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
      />

      <p className="text-lg font-semibold text-gray-800 mb-4">{currentNews.summary}</p>

      <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
        {currentNews.content}
      </div>

      <div className="mt-10">
        <Link to="/news" className="text-brand font-semibold hover:underline">← Back to all news</Link>
      </div>
    </article>
  );
}
