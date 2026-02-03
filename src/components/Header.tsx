import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-banner">
        <img src="/cuisine.jpeg" alt="cuisine" className="header-image" />
        <h1 className="header-title">Gourmet</h1>
      </div>
      <nav className="header-nav">
        <Link to="/">Recettes</Link>
      </nav>
    </header>
  );
}
