import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h2>404</h2>
      <p>page not found</p>
      <Link to="/">back to home</Link>
    </div>
  );
}
