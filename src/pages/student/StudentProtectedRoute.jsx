import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading your Academy…</div>;
  if (!user) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  return children;
}
