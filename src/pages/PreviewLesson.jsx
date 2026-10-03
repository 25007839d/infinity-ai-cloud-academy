import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getPreviewLesson } from '../services/lmsService';

export default function PreviewLesson(){
 const {slug,lessonSlug}=useParams(); const [data,setData]=useState(null); const [error,setError]=useState('');
 useEffect(()=>{getPreviewLesson(slug,lessonSlug).then(setData).catch(e=>setError(e.message));},[slug,lessonSlug]);
 return <><Navbar/><main className="min-h-screen bg-[#030712] text-white px-5 pt-28 pb-20"><div className="max-w-5xl mx-auto">{error?<div className="text-center"><h1 className="text-3xl font-bold">{error}</h1><Link to={`/courses/${slug}`} className="text-cyan-400 inline-block mt-5">Back to Course</Link></div>:!data?<div className="text-center text-slate-400">Loading preview…</div>:<><p className="text-cyan-400 text-sm font-semibold uppercase">FREE PREVIEW · {data.course.title}</p><h1 className="text-4xl font-bold mt-3">{data.lesson.title}</h1><p className="text-slate-400 mt-3">{data.lesson.description}</p><div className="mt-8 space-y-6">{data.lesson.content?.map((c,i)=><section key={i} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"><div className="p-4 border-b border-slate-800 font-semibold">{c.title||c.contentType}</div>{c.contentUrl?<iframe title={c.title||c.contentType} src={c.contentUrl} className="w-full min-h-[650px] border-0"/>:<div className="p-6 prose prose-invert max-w-none" dangerouslySetInnerHTML={{__html:c.contentHtml||''}}/>}</section>)}</div><div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6"><h2 className="text-xl font-bold">Ready to continue?</h2><p className="text-slate-400 mt-2">Create a free student account and enroll in this course to unlock the complete learning path and labs.</p><Link to={`/courses/${slug}`} className="inline-block mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold">View Course & Enroll</Link></div></>}</div></main><Footer/></>
}
