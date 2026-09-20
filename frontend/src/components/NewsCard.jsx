import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "https://placehold.co/600x400?text=News";

export default function NewsCard({ news, size = "normal" }) {
  const imageHeight = size === "large" ? "h-64" : "h-40";

  return (
    <Link to={`/news/${news._id}`} className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
      <div className={`${imageHeight} w-full overflow-hidden bg-gray-100`}>
        <img
          src={news.image || FALLBACK_IMAGE}
          alt={news.title}
          className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">{news.category}</span>
        <h3 className={`mt-1 font-bold text-gray-900 group-hover:text-brand transition-colors ${size === "large" ? "text-xl" : "text-base"} line-clamp-2`}>
          {news.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{news.summary}</p>
        <div className="mt-2 text-xs text-gray-400 flex justify-between">
          <span>{news.author?.name || "Staff Writer"}</span>
          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
