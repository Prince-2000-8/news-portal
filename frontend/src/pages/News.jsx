import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore.js";
import NewsCard from "../components/NewsCard.jsx";
import Loader from "../components/Loader.jsx";

const categories = ["All", "Politics", "Sports", "Technology", "Business", "Entertainment", "Health", "World", "Other"];

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { newsList, page, pages, fetchNews, loading } = useNewsStore();

  const category = searchParams.get("category") || "All";
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  useEffect(() => {
    fetchNews({ page: 1, category, keyword: searchParams.get("keyword") || "" });
  }, [category, searchParams.get("keyword")]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ category, keyword });
  };

  const handlePageChange = (newPage) => {
    fetchNews({ page: newPage, category, keyword });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 border-l-4 border-brand pl-3">All News</h1>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search news..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button type="submit" className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark">
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSearchParams({ category: c, keyword })}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              category === c
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      
      </div>

      {loading ? (
        <Loader />
      ) : newsList.length === 0 ? (
        <p className="text-gray-500">No news found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsList.map((n) => (
              <NewsCard key={n._id} news={n} />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-9 h-9 rounded font-semibold ${p === page ? "bg-brand text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
