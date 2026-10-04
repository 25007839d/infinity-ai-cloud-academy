import { useEffect, useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, PlayCircle } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getLearningCourse, saveLessonProgress } from '../../services/lmsService';

export default function LearningCourse(){
 const {slug}=useParams(); const navigate=useNavigate(); const location=useLocation(); const [data,setData]=useState(null); const [error,setError]=useState(''); const [open,setOpen]=useState(0); const [activeLessonId,setActiveLessonId]=useState('');
 useEffect(()=>{getLearningCourse(slug).then(setData).catch(e=>{setError(e.message); if(e.status===403) setTimeout(()=>navigate(`/courses/${slug}`),900);});},[slug,navigate]);
 useEffect(()=>{
   const params=new URLSearchParams(location.search);
   const requestedModule=params.get('module')||'';
   const requestedLesson=params.get('lesson')||'';
   if(!data) return;
   const modules=data.course?.curriculum||[];
   let moduleIndex=requestedModule?modules.findIndex(m=>String(m.id)===requestedModule):-1;
   if(moduleIndex<0 && requestedLesson){ moduleIndex=modules.findIndex(m=>(m.lessons||[]).some(l=>String(l.id)===requestedLesson)); }
   setOpen(moduleIndex>=0?moduleIndex:0);
   setActiveLessonId(requestedLesson);
   if(requestedLesson){
     requestAnimationFrame(()=>document.getElementById(`lesson-${requestedLesson}`)?.scrollIntoView({block:'center'}));
   }
 },[data,location.search]);
 if(error) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold">{error}</h1><p className="text-slate-500 mt-2">Redirecting to the course page…</p></div></div>;
 if(!data) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading course…</div>;
 const course=data.course; const lessons=course.curriculum?.flatMap(m=>m.lessons||[])||[]; const previewCount=lessons.filter(l=>l.isPreview).length;
 return <div className="min-h-screen bg-[#030712] text-white"><header className="border-b border-slate-800 bg-slate-950/90 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between"><Link to="/student" className="font-bold">← Student Dashboard</Link><span className="text-sm text-slate-400">{course.title}</span></div></header><div className="max-w-7xl mx-auto grid lg:grid-cols-[330px_1fr] min-h-[calc(100vh-65px)]"><aside className="border-r border-slate-800 p-5 space-y-3">{course.curriculum?.map((m,i)=><div key={m.id||i} className="rounded-xl border border-slate-800 overflow-hidden"><button onClick={()=>setOpen(open===i?-1:i)} className="w-full p-4 flex justify-between text-left bg-slate-900"><span><span className="text-cyan-400 text-xs">MODULE {String(i+1).padStart(2,'0')}</span><span className="block font-semibold mt-1">{m.module}</span></span>{open===i?<ChevronDown size={18}/>:<ChevronRight size={18}/>}</button>{open===i&&<div className="bg-slate-950">{(m.lessons||[]).map(l=><Link id={`lesson-${l.id}`} key={l.id} to={`/learn/${slug}/${l.slug}?module=${encodeURIComponent(m.id||'')}&lesson=${encodeURIComponent(l.id||'')}`} className={`block px-4 py-3 border-t border-slate-800 hover:bg-slate-900 ${activeLessonId===String(l.id)?'bg-cyan-500/10 border-l-2 border-l-cyan-400':''}`}><div className="flex gap-2 items-start"><PlayCircle size={15} className="mt-1 text-cyan-400"/><span className={`text-sm ${activeLessonId===String(l.id)?'text-cyan-200':''}`}>{l.title}</span></div><span className="text-[11px] text-slate-500 ml-5">{l.lessonType} {l.durationMinutes?`· ${l.durationMinutes} min`:''}</span></Link>)}</div>}</div>)}</aside><main className="p-6 md:p-10"><div className="max-w-4xl"><p className="text-cyan-400 text-sm font-semibold">COURSE PLAYER</p><h1 className="text-4xl font-bold mt-2">{course.title}</h1><p className="text-slate-400 mt-3">{course.tagline||course.shortDescription}</p><div className="mt-8 grid sm:grid-cols-3 gap-4"><Stat label="Modules" value={course.curriculum?.length||0}/><Stat label="Lessons" value={lessons.length}/><Stat label="Preview lessons" value={previewCount}/></div><div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-bold">Start Learning</h2><p className="text-slate-400 mt-2">Choose a lesson from the curriculum. Each lesson can contain Quarto slides, video, notes, SQL, Python or PySpark practice.</p>{lessons[0]&&<Link to={`/learn/${slug}/${lessons[0].slug}`} className="inline-flex items-center gap-2 mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold"><PlayCircle size={18}/> Start First Lesson</Link>}</div></div></main></div></div>
}
function Stat({label,value}){return <div className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-slate-500 text-sm">{label}</p><p className="text-2xl font-bold mt-1">{value}</p></div>}
