import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-brand mb-4">404</h1>
      <p className="text-gray-600 mb-6">The page you are looking for doesn't exist.</p>
      <Link to="/" className="bg-brand text-white px-6 py-2 rounded hover:bg-brand-dark">Go Home</Link>
    </div>
  );
}
