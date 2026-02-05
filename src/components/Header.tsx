import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-banner">
        <img src="/cuisine.jpeg" alt="cuisine" className="header-image" fetchPriority="high" width="1920" height="200" />
        <h1 className="header-title">Gourmet</h1>
      </div>
      <nav className="header-nav">
        <Link to="/">Recettes</Link>
        {user ? (
          <>
            <Link to="/favorites">Favoris</Link>
            <button onClick={logout} className="header-logout">
              Logout ({user.username})
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
