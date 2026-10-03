import { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Code2, Image as ImageIcon, Lightbulb, Send, Target } from 'lucide-react';
import { getLessonExperience, submitAssignment, submitQuizAttempt } from '../../services/learningExperienceService';

export default function LearningExperience({ courseSlug, lessonSlug }){
  const [data,setData]=useState(null); const [error,setError]=useState('');
  useEffect(()=>{getLessonExperience(courseSlug,lessonSlug).then(setData).catch(e=>setError(e.message));},[courseSlug,lessonSlug]);
  if(error) return null;
  if(!data) return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-500">Loading practice, quiz, lab and assignment…</div>;
  return <div className="mt-8 space-y-6">
    <Visuals visuals={data.visuals||[]}/>
    <Practice practice={data.practice}/>
    <Quiz quiz={data.quiz}/>
    <Assignment assignment={data.assignment}/>
  </div>;
}

function Visuals({visuals}){
  if(!visuals.length) return null;
  return <section className="rounded-2xl border border-cyan-500/20 bg-slate-900 overflow-hidden">
    <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
      <ImageIcon size={18} className="text-cyan-400"/>
      <div><h2 className="font-bold">Concept Visual</h2><p className="text-xs text-slate-500">Visual explanation before the hands-on work</p></div>
    </div>
    <div className="p-4 space-y-4">
      {visuals.map(v=><figure key={v.id} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <img
          src={v.imageUrl}
          alt={v.altText}
          className="block w-full h-auto max-h-[620px] object-contain bg-slate-950"
          loading="lazy"
          onError={(e)=>{e.currentTarget.style.display='none';e.currentTarget.parentElement?.classList.add('p-5');}}
        />
        <figcaption className="px-4 py-3 text-sm text-slate-400">{v.caption}</figcaption>
      </figure>)}
    </div>
  </section>
}

function Practice({practice}){ if(!practice) return null; return <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"><div className="flex items-center gap-2"><Lightbulb size={19} className="text-amber-300"/><h2 className="text-xl font-bold">{practice.title}</h2></div><p className="text-sm text-slate-400 mt-2">{practice.instructions}</p><ol className="mt-4 space-y-3">{(practice.tasks||[]).map((t,i)=><li key={i} className="flex gap-3 text-sm text-slate-200"><span className="w-6 h-6 shrink-0 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-amber-300">{i+1}</span><span>{t}</span></li>)}</ol></section> }

function Quiz({quiz}){
  const [answers,setAnswers]=useState({}); const [result,setResult]=useState(null); const [loading,setLoading]=useState(false);
  if(!quiz) return null;
  const submit=async()=>{setLoading(true);try{const ordered=quiz.questions.map(q=>answers[q.id]===undefined?-1:Number(answers[q.id]));setResult(await submitQuizAttempt(quiz.id,ordered));}catch(e){setResult({error:e.message});}finally{setLoading(false)}};
  return <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><ClipboardCheck size={19} className="text-blue-300"/><div><h2 className="text-xl font-bold">{quiz.title}</h2><p className="text-xs text-slate-500">Passing score: {quiz.passingPercent}%</p></div></div>{result&&!result.error&&<span className={`rounded-full px-3 py-1 text-xs font-semibold ${result.passed?'bg-emerald-500/15 text-emerald-300':'bg-red-500/15 text-red-300'}`}>{result.scorePercent}% · {result.passed?'Passed':'Try again'}</span>}</div><div className="mt-5 space-y-5">{quiz.questions.map((q,qi)=><div key={q.id} className="rounded-xl border border-slate-800 bg-slate-950 p-5"><div className="flex gap-3"><span className="text-xs text-blue-300 font-semibold">Q{qi+1}</span><h3 className="font-semibold text-slate-100">{q.questionText}</h3></div><div className="mt-4 grid gap-2">{q.options.map((option,oi)=><label key={oi} className={`flex gap-3 items-start rounded-lg border p-3 cursor-pointer ${Number(answers[q.id])===oi?'border-blue-400 bg-blue-500/10':'border-slate-800 hover:border-slate-700'}`}><input type="radio" name={q.id} checked={Number(answers[q.id])===oi} onChange={()=>setAnswers({...answers,[q.id]:oi})}/><span className="text-sm text-slate-300">{option}</span></label>)}</div>{result?.results?.[qi]&&<p className={`mt-3 text-xs ${result.results[qi].correct?'text-emerald-300':'text-red-300'}`}>{result.results[qi].correct?'Correct.':'Not correct.'} {result.results[qi].explanation}</p>}</div>)}</div>{result?.error&&<p className="mt-4 text-sm text-red-300">{result.error}</p>}<button onClick={submit} disabled={loading} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold disabled:opacity-50"><Target size={17}/>{loading?'Checking…':'Submit Quiz'}</button></section>
}

function Assignment({assignment}){
  const [text,setText]=useState(''); const [status,setStatus]=useState(''); const [loading,setLoading]=useState(false);
  if(!assignment) return null;
  const submit=async()=>{setLoading(true);setStatus('');try{await submitAssignment(assignment.id,{submissionType:assignment.submissionType,submissionText:text});setStatus('Assignment submitted successfully.');}catch(e){setStatus(e.message)}finally{setLoading(false)}};
  return <section className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6"><div className="flex items-center gap-2"><Code2 size={19} className="text-purple-300"/><div><h2 className="text-xl font-bold">{assignment.title}</h2><p className="text-xs text-slate-500">Submission: {assignment.submissionType}</p></div></div><div className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">{assignment.instructions}</div>{assignment.submission&&<div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">Previous submission: {assignment.submission.status}</div>}<textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste your solution, GitHub link, design notes or submission details…" className="mt-5 w-full min-h-40 rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200 outline-none focus:border-purple-400"/><button onClick={submit} disabled={loading||!text.trim()} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold disabled:opacity-50"><Send size={17}/>{loading?'Submitting…':'Submit Assignment'}</button>{status&&<p className="mt-3 text-sm text-slate-300">{status}</p>}</section>
}
