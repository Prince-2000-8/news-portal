import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNewsStore } from "../store/newsStore.js";
import NewsCard from "../components/NewsCard.jsx";
import Loader from "../components/Loader.jsx";

const categories = ["Politics", "Sports", "Technology", "Business", "Entertainment", "Health"];

export default function Home() {
  const { topNews, newsList, fetchTopNews, fetchNews, loading } = useNewsStore();

  useEffect(() => {
    fetchTopNews();
    fetchNews({ page: 1 });
  }, []);

  const featured = topNews[0];
  const restTop = topNews.slice(1, 6);

  return (
    <div>
      {/* Section 1: Hero */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Stay Informed. Stay Ahead.</h1>
          <p className="text-gray-300 max-w-2xl">
            Breaking news, in-depth stories and community-published reports, updated every day.
          </p>
        </div>
      </section>

      {/* Section 2: Top 6 News */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-brand pl-3">Top Stories</h2>
          <Link to="/news" className="text-brand text-sm font-semibold hover:underline">View all →</Link>
        </div>

        {loading && topNews.length === 0 ? (
          <Loader />
        ) : topNews.length === 0 ? (
          <p className="text-gray-500">No news published yet. Be the first to publish!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured && (
              <div className="md:col-span-2 md:row-span-2">
                <NewsCard news={featured} size="large" />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
              {restTop.map((n) => (
                <NewsCard key={n._id} news={n} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 3: Categories */}
      <section className="bg-white py-10 border-y">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold border-l-4 border-brand pl-3 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/news?category=${cat}`}
                className="bg-gray-50 hover:bg-brand hover:text-white transition-colors text-center py-4 rounded font-semibold text-gray-700"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Latest News */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-brand pl-3">Latest News</h2>
          <Link to="/news" className="text-brand text-sm font-semibold hover:underline">View all →</Link>
        </div>
        {loading && newsList.length === 0 ? (
          <Loader />
        ) : newsList.length === 0 ? (
          <p className="text-gray-500">No news available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsList.slice(0, 6).map((n) => (
              <NewsCard key={n._id} news={n} />
            ))}
          </div>
        )}
      </section>

      {/* Section 5: Call to action */}
      <section className="bg-brand text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Have a story to tell?</h2>
          <p className="mb-6 text-white/90">Join our community of writers and publish your own news for free.</p>
          <Link to="/register" className="bg-white text-brand font-semibold px-6 py-2.5 rounded hover:bg-gray-100">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
