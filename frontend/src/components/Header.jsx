import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b-4 border-brand sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          The Daily <span className="text-brand">Rise</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-brand transition-colors">
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-brand transition-colors">Dashboard</Link>
              <Link to="/create-news" className="bg-brand text-white px-4 py-1.5 rounded hover:bg-brand-dark transition-colors">
                Publish News
              </Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-brand">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-brand transition-colors">Login</Link>
              <Link to="/register" className="bg-brand text-white px-4 py-1.5 rounded hover:bg-brand-dark transition-colors">
                Register
              </Link>
            </>
          )}
        </nav>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/create-news" onClick={() => setOpen(false)}>Publish News</Link>
              <button onClick={() => { setOpen(false); handleLogout(); }} className="text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
