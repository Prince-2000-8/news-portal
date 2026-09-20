import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">The Daily Rise</h3>
          <p className="text-sm text-gray-400">
            Independent, community-driven news. Stories published by real people, for real people.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/news" className="hover:text-white">All News</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/register" className="hover:text-white">Become a Contributor</Link></li>
          </ul>
        </div>

                <div>
          <h4 className="text-white font-semibold mb-2">Categories</h4>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {["Politics", "Sports", "Technology", "Business", "Entertainment", "Health"].map((cat) => (
              <li key={cat}>
                <Link to={`/news?category=${cat}`} className="hover:text-white">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} The Daily Rise. All rights reserved.
      </div>
    </footer>
  );
}
