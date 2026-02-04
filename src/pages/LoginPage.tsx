import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;
  return <LoginForm />;
}
