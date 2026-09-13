import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { getStudent, listStudents, updateStudent } from '../services/adminService';
import { ArrowLeft, Eye, Pencil, Phone, Mail, Calendar, BookOpen } from 'lucide-react';

export default function Users() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => listStudents().then(setItems).catch(e => setError(e.message)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const open = async (id) => {
    setError('');
    try { setSelected(await getStudent(id)); } catch (e) { setError(e.message); }
  };

  const toggleStatus = async () => {
    if (!selected) return;
    try {
      const next = selected.status === 'Active' ? 'Disabled' : 'Active';
      const updated = await updateStudent(selected.id, { status: next });
      setSelected({ ...selected, ...updated });
      load();
    } catch (e) { setError(e.message); }
  };

  if (selected) return <AdminLayout>
    <div className="max-w-6xl space-y-6">
      <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-slate-400 hover:text-white"><ArrowLeft size={18}/> Students</button>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div><h1 className="text-3xl font-bold text-white">{selected.full_name}</h1><p className="mt-2 text-slate-400">Student ID: {selected.id}</p></div>
          <button onClick={toggleStatus} className={`rounded-xl px-5 py-3 font-semibold ${selected.status === 'Active' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>{selected.status === 'Active' ? 'Disable Student' : 'Activate Student'}</button>
        </div>
        <div className="mt-7 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Info icon={<Mail size={17}/>} label="Email" value={selected.email}/>
          <Info icon={<Phone size={17}/>} label="Mobile" value={selected.phone || 'Not available'}/>
          <Info icon={<Calendar size={17}/>} label="Registered" value={selected.created_at ? new Date(selected.created_at).toLocaleString() : '—'}/>
          <Info icon={<Eye size={17}/>} label="Last Login" value={selected.last_login ? new Date(selected.last_login).toLocaleString() : 'Never'}/>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
        <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen size={22}/> Course Views</h2>
        <p className="text-slate-400 mt-2">Courses this student has opened after login.</p>
        {!selected.viewedCourses?.length ? <p className="mt-6 text-slate-500">No course details viewed yet.</p> : <div className="mt-5 overflow-auto"><table className="w-full text-left"><thead className="text-slate-500 text-sm"><tr><th className="p-3">Course</th><th className="p-3">Views</th><th className="p-3">First Viewed</th><th className="p-3">Last Viewed</th></tr></thead><tbody>{selected.viewedCourses.map(c => <tr key={c.id} className="border-t border-slate-800"><td className="p-3 font-semibold">{c.title}</td><td className="p-3">{c.view_count}</td><td className="p-3 text-slate-400">{new Date(c.first_viewed_at).toLocaleString()}</td><td className="p-3 text-slate-400">{new Date(c.last_viewed_at).toLocaleString()}</td></tr>)}</tbody></table></div>}
      </div>
      {error && <div className="rounded-xl bg-red-500/10 p-4 text-red-400">{error}</div>}
    </div>
  </AdminLayout>;

  return <AdminLayout>
    <div className="space-y-6">
      <div><h1 className="text-4xl font-bold">Students</h1><p className="mt-2 text-slate-400">Registered student accounts, mobile numbers, login activity and course-detail views.</p></div>
      {error && <div className="rounded-xl bg-red-500/10 p-4 text-red-400">{error}</div>}
      {loading ? <p className="text-slate-400">Loading students…</p> : <div className="overflow-auto rounded-2xl border border-slate-800"><table className="w-full text-left"><thead className="bg-slate-900 text-slate-400"><tr><th className="p-4">Student</th><th className="p-4">Mobile</th><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4">Registered</th><th className="p-4">Action</th></tr></thead><tbody>{items.map(u => <tr key={u.id} className="border-t border-slate-800"><td className="p-4 font-semibold">{u.full_name}</td><td className="p-4 text-slate-300">{u.phone || '—'}</td><td className="p-4 text-slate-400">{u.email}</td><td className="p-4"><span className="rounded-full bg-slate-800 px-3 py-1 text-xs">{u.status}</span></td><td className="p-4 text-slate-400">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td><td className="p-4"><button onClick={() => open(u.id)} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-cyan-300"><Eye size={16}/> View</button></td></tr>)}</tbody></table></div>}
    </div>
  </AdminLayout>;
}

function Info({ icon, label, value }) { return <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><div className="flex items-center gap-2 text-cyan-400 text-sm">{icon}<span>{label}</span></div><p className="mt-2 text-sm text-white break-all">{value}</p></div>; }
