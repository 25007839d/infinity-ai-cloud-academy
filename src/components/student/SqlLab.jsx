import { useEffect, useMemo, useState } from 'react';
import { Database, ExternalLink, Play, RotateCcw } from 'lucide-react';
import { apiRequest } from '../../services/api';

export default function SqlLab({ lab }) {
  const starter = String(lab?.config?.starterSql || lab?.config?.codeText || '');
  const resources = Array.isArray(lab?.config?.resources) ? lab.config.resources.filter(r => r?.url) : [];
  const [sql, setSql] = useState(starter);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [schema, setSchema] = useState(null);
  const [selection, setSelection] = useState('');
  const [activeTab, setActiveTab] = useState('SQL');

  useEffect(() => { apiRequest('/labs/sql/schema').then(setSchema).catch(() => {}); }, []);
  useEffect(() => { setSql(starter); setSelection(''); setResult(null); setError(''); setActiveTab('SQL'); }, [starter, lab?.id]);

  const run = async () => {
    const payload = selection.trim() || sql.trim();
    if (!payload) {
      setError('No SQL query is configured. Please ask the instructor to add the practice SQL from the Admin CMS.');
      return;
    }
    setRunning(true);
    setError('');
    try {
      setResult(await apiRequest('/labs/sql/execute', { method: 'POST', body: JSON.stringify({ sql: payload }) }));
    } catch (e) {
      setResult(null);
      setError(e.message);
    } finally {
      setRunning(false);
    }
  };

  const results = result?.resultSets?.length ? result.resultSets : [result].filter(Boolean);
  const hasInstructions = Boolean(String(lab?.instructions || '').trim());
  const tabs = useMemo(() => [{ key: 'SQL', label: 'SQL Practice' }, ...resources.map((r, i) => ({ key: `R${i}`, label: r.title || resourceLabel(r.type, i + 1) }))], [resources]);
  const activeResource = activeTab.startsWith('R') ? resources[Number(activeTab.slice(1))] : null;

  return <section className="rounded-2xl border border-emerald-500/20 bg-slate-950 overflow-hidden">
    <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <p className="text-xs text-emerald-400 uppercase tracking-wider">SQL LAB</p>
        <h3 className="text-xl font-bold mt-1">{lab?.title || 'MySQL Practice'}</h3>
        {hasInstructions && <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300 whitespace-pre-wrap leading-6">{lab.instructions}</div>}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500"><Database size={15}/>{schema?.configured ? schema.database : 'Setup required'}</div>
    </div>

    <div className="border-b border-slate-800 px-5 pt-3 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {tabs.map(tab => <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`px-4 py-2.5 rounded-t-xl text-sm font-semibold border-b-2 ${activeTab === tab.key ? 'text-emerald-300 border-emerald-400 bg-emerald-500/5' : 'text-slate-400 border-transparent hover:text-white'}`}>{tab.label}</button>)}
      </div>
    </div>

    {activeResource ? <ResourcePanel resource={activeResource} /> : <div className="grid lg:grid-cols-[1fr_260px]">
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div><p className="text-xs uppercase tracking-wider text-slate-500">Practice SQL</p><p className="text-xs text-slate-500 mt-1">The instructor controls the starter query from the Admin CMS. Select part of the editor to run only that SQL.</p></div>
          <span className="text-xs text-slate-500">{sql.length.toLocaleString()} chars</span>
        </div>
        <textarea value={sql} onChange={e=>setSql(e.target.value)} onSelect={e=>setSelection(e.currentTarget.value.slice(e.currentTarget.selectionStart,e.currentTarget.selectionEnd))} spellCheck="false" placeholder="No starter SQL is configured for this lab." className="w-full min-h-72 rounded-xl border border-slate-700 bg-[#020617] p-4 font-mono text-sm text-emerald-200 outline-none focus:border-cyan-500"/>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={run} disabled={running} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold disabled:opacity-50"><Play size={16}/>{running?'Running…':selection.trim()?'Run Selected':'Run All Queries'}</button>
          <button type="button" onClick={()=>{setSql(starter);setSelection('');setResult(null);setError('')}} className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3"><RotateCcw size={15}/> Reset</button>
          {selection.trim() && <span className="self-center text-xs text-cyan-300">Selected SQL will run</span>}
        </div>
        {error&&<div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">{error}</div>}
        {result&&<div className="mt-5 space-y-5"><div className="text-xs text-slate-500">{results.length} statement(s) · {result.executionMs} ms total</div>{results.map((r,i)=><ResultTable key={r.index||i} result={r} index={i}/>)}</div>}
      </div>
      <aside className="border-l border-slate-800 p-5"><h4 className="font-semibold">Available Tables</h4>{schema?.tables?.length?<ul className="mt-3 space-y-2">{schema.tables.map(t=><li key={t} className="text-sm text-cyan-300 font-mono">{t}</li>)}</ul>:<p className="mt-3 text-sm text-slate-500">Configure SQL_LAB_DATABASE and seed practice tables.</p>}</aside>
    </div>}
  </section>;
}

function resourceLabel(type, index) {
  const t=String(type||'LINK').toUpperCase();
  if(t==='GITHUB') return 'GitHub';
  if(t==='DRIVE') return 'Drive';
  if(t==='COLAB') return 'Colab';
  return `Resource ${index}`;
}

function drivePreview(url='') {
  const u=String(url).trim();
  const file=u.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if(file) return `https://drive.google.com/file/d/${file[1]}/preview`;
  const slides=u.match(/docs\.google\.com\/presentation\/d\/([^/]+)/i);
  if(slides) return `https://docs.google.com/presentation/d/${slides[1]}/embed`;
  return '';
}

function ResourcePanel({ resource }) {
  const type=String(resource.type||'LINK').toUpperCase();
  const preview = type === 'DRIVE' ? drivePreview(resource.url) : '';
  return <div className="p-5">
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-xs uppercase tracking-wider text-cyan-400">Lab Resource</p><h4 className="text-lg font-bold mt-1">{resource.title || resourceLabel(type, 1)}</h4>{resource.description&&<p className="text-sm text-slate-400 mt-2">{resource.description}</p>}</div>
        <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm text-cyan-300"><ExternalLink size={16}/> Open</a>
      </div>
    </div>
    {preview && <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 bg-black"><iframe title={resource.title||'Drive resource'} src={preview} className="w-full min-h-[720px] border-0" loading="lazy" allow="autoplay"/></div>}
  </div>;
}

function ResultTable({result,index}){
  return <div className="overflow-auto rounded-xl border border-slate-800"><div className="p-3 bg-slate-900 border-b border-slate-800"><span className="text-xs text-emerald-400">Query {index+1}</span><pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap">{result.sql}</pre><div className="mt-2 text-xs text-slate-500">{result.rowCount} rows</div></div>{result.columns?.length?<table className="w-full text-left text-sm"><thead className="bg-slate-900"><tr>{result.columns.map(c=><th key={c} className="p-3 text-slate-400">{c}</th>)}</tr></thead><tbody>{result.rows.map((r,i)=><tr key={i} className="border-t border-slate-800">{result.columns.map(c=><td key={c} className="p-3 text-slate-200">{String(r[c]??'')}</td>)}</tr>)}</tbody></table>:<div className="p-4 text-slate-500">Statement completed without tabular output.</div>}</div>
}
