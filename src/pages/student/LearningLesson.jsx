import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getLearningLesson, saveLessonProgress } from '../../services/lmsService';
import SqlLab from '../../components/student/SqlLab';
import LearningExperience from '../../components/student/LearningExperience';

export default function LearningLesson(){
 const {slug,lessonSlug}=useParams(); const [data,setData]=useState(null); const [error,setError]=useState(''); const [saving,setSaving]=useState(false);
 useEffect(()=>{getLearningLesson(slug,lessonSlug).then(setData).catch(e=>setError(e.message));},[slug,lessonSlug]);
 if(error) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold">{error}</h1><Link to={`/learn/${slug}`} className="text-cyan-400 mt-4 inline-block">Back to course</Link></div></div>;
 if(!data) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading lesson…</div>;
 const l=data.lesson; const progress=data.progress?.progress_percent||data.progress?.progressPercent||0;
 const complete=async()=>{setSaving(true);try{await saveLessonProgress(l.id,100);setData({...data,progress:{...(data.progress||{}),progress_percent:100,status:'COMPLETED'}});}finally{setSaving(false)}};
 return <div className="min-h-screen bg-[#030712] text-white"><header className="border-b border-slate-800 bg-slate-950/90 sticky top-0 z-40"><div className="max-w-5xl mx-auto px-5 py-4"><Link to={`/learn/${slug}`} className="text-slate-400 hover:text-white">← Back to course</Link></div></header><main className="max-w-5xl mx-auto px-5 py-8 pb-20"><div className="flex flex-wrap items-center gap-3 text-xs text-slate-500"><span className="rounded-full bg-cyan-500/10 text-cyan-300 px-3 py-1">{l.lessonType}</span>{l.durationMinutes>0&&<span>{l.durationMinutes} min</span>}</div><h1 className="text-4xl md:text-5xl font-bold mt-4">{l.title}</h1><p className="text-lg text-slate-400 mt-3 max-w-3xl">{l.description}</p><div className="mt-8 space-y-6">{l.whatYouLearnHtml&&<WhatYouLearn html={l.whatYouLearnHtml}/>} {l.videoEmbedUrl&&<VideoEmbed url={l.videoEmbedUrl} type={l.videoEmbedType}/>} {l.driveEmbedUrl&&<DriveEmbed url={l.driveEmbedUrl}/>} {(l.content||[]).map((c,i)=><Content key={i} c={c}/>)} {(l.labs||[]).map(lab=>lab.labType==='SQL'?<SqlLab key={lab.id||lab.labType} lab={lab}/>:<Lab key={lab.id||lab.labType} lab={lab}/>)} {!(l.content?.length||l.labs?.length||l.videoEmbedUrl||l.driveEmbedUrl||l.whatYouLearnHtml)&&<div className="rounded-2xl border border-dashed border-slate-700 p-8 text-slate-400">Lesson content is being prepared. You can still mark this lesson complete.</div>}<LearningExperience courseSlug={slug} lessonSlug={lessonSlug}/></div><div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex justify-between text-sm"><span className="text-slate-400">Lesson progress</span><span>{progress}%</span></div><div className="h-2 rounded-full bg-slate-800 mt-2"><div className="h-full bg-cyan-400 rounded-full" style={{width:`${progress}%`}}/></div><button disabled={saving||progress>=100} onClick={complete} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold disabled:opacity-50">{progress>=100?<><CheckCircle2 size={18}/> Completed</>:saving?'Saving…':<><CheckCircle2 size={18}/> Complete Lesson</>}</button></div></main></div>
}
function youtubeEmbedUrl(url='') {
 const u=String(url).trim();
 if(!u) return '';
 if(/youtube(?:-nocookie)?\.com\/embed\//i.test(u)) return u.replace('www.youtube.com','www.youtube-nocookie.com');
 const watch=u.match(/youtube\.com\/(?:watch\?v=|shorts\/)([^&?/]+)/i);
 if(watch) return `https://www.youtube-nocookie.com/embed/${watch[1]}?rel=0&modestbranding=1`;
 const short=u.match(/youtu\.be\/([^?&/]+)/i);
 if(short) return `https://www.youtube-nocookie.com/embed/${short[1]}?rel=0&modestbranding=1`;
 return '';
}
function videoPreviewUrl(url='',type='YOUTUBE') {
 if(String(type).toUpperCase()==='GOOGLE_DRIVE') return drivePreviewUrl(url);
 return youtubeEmbedUrl(url);
}
function SecureEmbed({title,src,allow='',className='w-full h-full'}){
 if(!src) return null;
 return <iframe title={title} src={src} className={`${className} border-0`} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-presentation" allow={allow} />;
}
function VideoEmbed({url,type}){
 const src=videoPreviewUrl(url,type); if(!src) return null;
 const label=String(type).toUpperCase()==='GOOGLE_DRIVE'?'Google Drive Video':'YouTube Video';
 return <section className="rounded-2xl border border-violet-500/20 bg-slate-900 overflow-hidden"><div className="px-5 py-4 border-b border-slate-800"><h2 className="font-bold">Video</h2></div><div className="aspect-video bg-black"><SecureEmbed title={label} src={src} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/></div></section>
}
function drivePreviewUrl(url='') {
 const u=String(url).trim(); if(!u) return '';
 const file=u.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
 if(file) return `https://drive.google.com/file/d/${file[1]}/preview`;
 const slides=u.match(/docs\.google\.com\/presentation\/d\/([^/]+)/i);
 if(slides) return `https://docs.google.com/presentation/d/${slides[1]}/embed`;
 const folder=u.match(/drive\.google\.com\/(?:drive\/)?folders\/([^?/#]+)/i);
 if(folder) return `https://drive.google.com/embeddedfolderview?id=${folder[1]}#list`;
 const doc=u.match(/docs\.google\.com\/document\/d\/([^/]+)/i);
 if(doc) return `https://docs.google.com/document/d/${doc[1]}/preview`;
 const sheet=u.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
 if(sheet) return `https://docs.google.com/spreadsheets/d/${sheet[1]}/preview`;
 return '';
}
function DriveEmbed({url}){
 const src=drivePreviewUrl(url); if(!src) return null;
 return <section className="rounded-2xl border border-cyan-500/20 bg-slate-900 overflow-hidden"><div className="px-5 py-4 border-b border-slate-800"><h2 className="font-bold">Reference Material</h2><p className="text-xs text-slate-500 mt-1">Embedded PPT / PDF</p></div><div className="p-2 bg-black"><SecureEmbed title="Course PPT or PDF" src={src} className="w-full min-h-[720px]" allow="autoplay"/></div></section>
}
function WhatYouLearn({html}){return <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden"><div className="px-5 py-3 border-b border-slate-800 text-sm font-semibold text-emerald-200">What You’ll Learn</div><div className="p-6 prose prose-invert max-w-none" dangerouslySetInnerHTML={{__html:html}}/></section>}
function inferEmbedType(url=''){
 const u=String(url).toLowerCase();
 if(u.includes('github.com/')) return 'GITHUB';
 if(u.includes('drive.google.com/file/') || u.includes('docs.google.com/presentation/')) return 'DRIVE';
 if(u.includes('youtube.com/') || u.includes('youtu.be/')) return 'YOUTUBE';
 return 'LINK';
}
function GitHubMaterial({url}){
 const [code,setCode]=useState(''); const [status,setStatus]=useState(url?'loading':'unsupported');
 useEffect(()=>{let active=true;if(!url){setStatus('unsupported');return()=>{};}setStatus('loading');fetch('/api/labs/embed/github',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})}).then(r=>r.json().then(body=>{if(!r.ok||body?.success===false)throw new Error('GitHub code failed');return body.data||body;})).then(d=>{if(active){setCode(String(d?.code||''));setStatus('ready');}}).catch(()=>{if(active)setStatus('error');});return()=>{active=false;}},[url]);
 if(status==='loading') return <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-400">Loading embedded code…</div>;
 if(status==='ready') return <pre className="max-h-[720px] overflow-auto rounded-xl border border-slate-800 bg-[#020617] p-5 text-sm text-emerald-200 whitespace-pre-wrap"><code>{code}</code></pre>;
 if(status==='unsupported') return <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400">GitHub source is available only as an embedded file view.</div>;
 return <div className="rounded-xl border border-dashed border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">GitHub code could not be embedded.</div>;
}
function EmbeddedResource({title,url,type}){
 const t=String(type||inferEmbedType(url)).toUpperCase(); const u=String(url||'').trim(); if(!u) return null;
 if(t==='COLAB' || /colab\.research\.google\.com/i.test(u)) return <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5"><p className="font-semibold">Google Colab</p><a href={u} target="_blank" rel="noreferrer" className="inline-flex mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold">Open in Colab</a></div>;
 if(t==='GITHUB') return <GitHubMaterial url={u}/>;
 if(t==='DRIVE'){const src=drivePreviewUrl(u);return src?<div className="rounded-xl overflow-hidden border border-slate-800 bg-black"><SecureEmbed title={title||'Embedded Drive resource'} src={src} className="w-full min-h-[700px]" allow="autoplay"/></div>:null;}
 if(t==='YOUTUBE'){const src=youtubeEmbedUrl(u);return src?<div className="rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video"><SecureEmbed title={title||'Embedded video'} src={src} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/></div>:null;}
 return <div className="rounded-xl overflow-hidden border border-slate-800 bg-black"><SecureEmbed title={title||'Embedded resource'} src={u} className="w-full min-h-[700px]"/></div>;
}
function Content({c}){
 const localGenerated=String(c.contentUrl||'').startsWith('/generated-syllabus/'); const hasHtml=Boolean(String(c.contentHtml||'').trim());
 if(localGenerated&&!hasHtml) return null;
 if(c.contentUrl&&!localGenerated) return <section className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"><div className="px-5 py-3 border-b border-slate-800 text-sm font-semibold">Custom Material</div><div className="p-2 bg-black"><EmbeddedResource title={c.title||'Custom Material'} url={c.contentUrl} type={inferEmbedType(c.contentUrl)}/></div></section>;
 if(hasHtml) return <section className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"><div className="px-5 py-3 border-b border-slate-800 text-sm font-semibold">Custom Material</div><div className="p-6 prose prose-invert max-w-none" dangerouslySetInnerHTML={{__html:c.contentHtml}}/></section>;
 return null;
}
function Lab({lab}){
 const cfg=lab.config||{}; const external=lab.labType!=='SQL'&&lab.externalUrl; const isColabExternal=Boolean(external&&/colab\.research\.google\.com/i.test(external)); const github=cfg.githubPath; const code=cfg.codeText; const dataset=lab.datasetUrl;
 return <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs text-cyan-400 uppercase tracking-wider">Hands-on Lab</p><h2 className="text-2xl font-bold mt-1">{lab.title}</h2></div><span className="rounded-full bg-slate-900 px-3 py-1 text-xs">{lab.labType}</span></div>
  {isColabExternal?<a href={external} target="_blank" rel="noreferrer" className="inline-flex mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold">Open in Colab</a>:null}
  {!external&&github?<div className="mt-5"><EmbeddedResource title="GitHub Code" url={github} type="GITHUB"/></div>:null}
  {!external&&dataset?<div className="mt-5"><EmbeddedResource title="Dataset" url={dataset} type={inferEmbedType(dataset)}/></div>:null}
  {code&&<div className="mt-5"><div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Starter / Editable Code</div><pre className="max-h-[520px] overflow-auto rounded-xl border border-slate-800 bg-[#020617] p-4 text-sm text-emerald-200 whitespace-pre-wrap"><code>{code}</code></pre></div>}
  {external&&!isColabExternal?<div className="mt-5"><EmbeddedResource title={lab.title||'Lab Resource'} url={external} type={inferEmbedType(external)}/></div>:null}
  {!external&&!github&&!dataset&&!code&&<div className="mt-5 rounded-xl bg-slate-950 border border-slate-800 p-5 text-slate-400"><strong className="text-white">{lab.labType==='INTERNAL_PYSPARK'?'Production PySpark Lab':'Hands-on Lab'}</strong></div>}
 </section>;
}
