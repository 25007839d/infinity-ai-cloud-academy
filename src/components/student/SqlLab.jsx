import { useEffect, useState } from 'react';
import { Database, Play, RotateCcw } from 'lucide-react';
import { apiRequest } from '../../services/api';

const defaultStarter = `SELECT * FROM employees LIMIT 10;

SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
ORDER BY employee_count DESC;`;

export default function SqlLab({ lab }){
  const starter=lab?.config?.starterSql||defaultStarter;
  const [sql,setSql]=useState(starter), [result,setResult]=useState(null), [error,setError]=useState(''), [running,setRunning]=useState(false), [schema,setSchema]=useState(null), [selection,setSelection]=useState('');
  useEffect(()=>{apiRequest('/labs/sql/schema').then(setSchema).catch(()=>{});},[]);
  const run=async()=>{const payload=selection.trim()||sql;setRunning(true);setError('');try{setResult(await apiRequest('/labs/sql/execute',{method:'POST',body:JSON.stringify({sql:payload})}));}catch(e){setResult(null);setError(e.message);}finally{setRunning(false)}};
  const results=result?.resultSets?.length?result.resultSets:[result].filter(Boolean);
  return <div className="rounded-2xl border border-emerald-500/20 bg-slate-950 overflow-hidden">
    <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div><p className="text-xs text-emerald-400 uppercase tracking-wider">SQL LAB</p><h3 className="text-xl font-bold mt-1">{lab.title||'MySQL Practice'}</h3><p className="text-sm text-slate-500 mt-1">Run multiple read-only SQL statements in one editor. Separate queries with semicolons.</p></div>
      <div className="flex items-center gap-2 text-xs text-slate-500"><Database size={15}/>{schema?.configured?schema.database:'Setup required'}</div>
    </div>
    <div className="grid lg:grid-cols-[1fr_260px]">
      <div className="p-5">
        <textarea value={sql} onChange={e=>setSql(e.target.value)} onSelect={e=>setSelection(e.currentTarget.value.slice(e.currentTarget.selectionStart,e.currentTarget.selectionEnd))} spellCheck="false" className="w-full min-h-72 rounded-xl border border-slate-700 bg-[#020617] p-4 font-mono text-sm text-emerald-200 outline-none focus:border-cyan-500"/>
        <div className="mt-3 flex gap-2"><button onClick={run} disabled={running} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold disabled:opacity-50"><Play size={16}/>{running?'Running…':selection.trim()?'Run Selected':'Run All Queries'}</button><button onClick={()=>{setSql(starter);setSelection('');setResult(null);setError('')}} className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3"><RotateCcw size={15}/> Reset</button></div>
        {error&&<div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">{error}</div>}
        {result&&<div className="mt-5 space-y-5"><div className="text-xs text-slate-500">{results.length} statement(s) · {result.executionMs} ms total</div>{results.map((r,i)=><ResultTable key={r.index||i} result={r} index={i}/>)}</div>}
      </div>
      <aside className="border-l border-slate-800 p-5"><h4 className="font-semibold">Available Tables</h4>{schema?.tables?.length?<ul className="mt-3 space-y-2">{schema.tables.map(t=><li key={t} className="text-sm text-cyan-300 font-mono">{t}</li>)}</ul>:<p className="mt-3 text-sm text-slate-500">Configure SQL_LAB_DATABASE and seed practice tables.</p>}</aside>
    </div>
  </div>
}
function ResultTable({result,index}){
  return <div className="overflow-auto rounded-xl border border-slate-800"><div className="p-3 bg-slate-900 border-b border-slate-800"><span className="text-xs text-emerald-400">Query {index+1}</span><pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap">{result.sql}</pre><div className="mt-2 text-xs text-slate-500">{result.rowCount} rows</div></div>{result.columns?.length?<table className="w-full text-left text-sm"><thead className="bg-slate-900"><tr>{result.columns.map(c=><th key={c} className="p-3 text-slate-400">{c}</th>)}</tr></thead><tbody>{result.rows.map((r,i)=><tr key={i} className="border-t border-slate-800">{result.columns.map(c=><td key={c} className="p-3 text-slate-200">{String(r[c]??'')}</td>)}</tr>)}</tbody></table>:<div className="p-4 text-slate-500">Statement completed without tabular output.</div>}</div>
}
