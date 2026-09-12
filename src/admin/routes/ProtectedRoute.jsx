import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/adminService';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAdmin() {
      try {
        const admin = await getCurrentUser();
        if (mounted) setAuthorized(!!admin && admin.status === 'Active');
      } catch (error) {
        console.error('Admin auth error:', error);
        if (mounted) setAuthorized(false);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    checkAdmin();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>;
  }

  if (!authorized) return <Navigate to="/admin/login" replace />;
  return children;
}
