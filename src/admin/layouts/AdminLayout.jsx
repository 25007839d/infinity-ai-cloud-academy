import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../services/adminService';
export default function AdminLayout({ children }) {
  const navigate=useNavigate();
  const links=[['/admin/dashboard','📊 Dashboard'],['/admin/courses','🎓 Courses'],['/admin/posts','📝 Posts'],['/admin/pages','📄 Pages'],['/admin/seo','🔎 SEO'],['/admin/demo-registrations','👥 Demo Registrations'],['/admin/analytics','📈 Analytics']];
  return <div className="min-h-screen bg-slate-950 flex"><aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 p-6"><h2 className="text-2xl font-bold text-white">Infinity AI CMS</h2><p className="text-xs text-slate-500 mt-1">Admin Panel</p><nav className="mt-8 space-y-2">{links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>`block px-4 py-3 rounded-xl ${isActive?'bg-blue-600 text-white':'text-slate-300 hover:bg-slate-800'}`}>{label}</NavLink>)}</nav><button onClick={async()=>{await logout();navigate('/admin/login')}} className="mt-8 w-full px-4 py-3 rounded-xl bg-slate-800 text-slate-300 flex items-center gap-2"><LogOut size={17}/> Logout</button></aside><main className="flex-1 p-10 text-white overflow-auto">{children}</main></div>;
}
