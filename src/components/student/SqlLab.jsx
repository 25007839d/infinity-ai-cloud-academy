import { useEffect, useMemo, useState } from 'react';
import { Database, FileCode2, Play, RotateCcw } from 'lucide-react';
import { apiRequest } from '../../services/api';

export default function SqlLab({ lab }) {
  const starter = String(lab?.config?.starterSql || '');
  const resources = Array.isArray(lab?.config?.resources)
    ? lab.config.resources.filter((r) => r?.url)
    : [];
  const fallback = getFallbackResource(lab, resources);
  const [sql, setSql] = useState(starter);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [schema, setSchema] = useState(null);
  const [selection, setSelection] = useState('');
  const [activeTab, setActiveTab] = useState('SQL');

  useEffect(() => {
    apiRequest('/labs/sql/schema').then(setSchema).catch(() => {});
  }, []);

  useEffect(() => {
    setSql(starter);
    setSelection('');
    setResult(null);
    setError('');
    setActiveTab('SQL');
  }, [starter, lab?.id]);

  const run = async () => {
    const payload = selection.trim() || sql.trim();
    if (!payload) {
      setError('No SQL practice query is configured for this lab.');
      return;
    }
    setRunning(true);
    setError('');
    try {
      setResult(await apiRequest('/labs/sql/execute', {
        method: 'POST',
        body: JSON.stringify({ sql: payload }),
      }));
    } catch (e) {
      setResult(null);
      setError(e.message);
    } finally {
      setRunning(false);
    }
  };

  const results = result?.resultSets?.length ? result.resultSets : [result].filter(Boolean);
  const tabs = useMemo(() => [
    { key: 'SQL', label: 'SQL Practice' },
    ...resources.map((r, i) => ({
      key: `R${i}`,
      label: r.title || resourceLabel(r.type, i + 1),
    })),
  ], [resources]);
  const activeResource = activeTab.startsWith('R')
    ? resources[Number(activeTab.slice(1))]
    : null;

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-slate-950 overflow-hidden">
      <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs text-emerald-400 uppercase tracking-wider">SQL LAB</p>
          <h3 className="text-xl font-bold mt-1">{lab?.title || 'SQL Practice'}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Database size={15}/>{schema?.configured ? schema.database : 'Setup required'}
        </div>
      </div>

      <div className="border-b border-slate-800 px-5 pt-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-t-xl text-sm font-semibold border-b-2 ${activeTab === tab.key ? 'text-emerald-300 border-emerald-400 bg-emerald-500/5' : 'text-slate-400 border-transparent hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeResource ? <ResourcePanel resource={activeResource} /> : (
        <div className="grid lg:grid-cols-[1fr_260px]">
          <div className="p-5">
            {starter.trim() ? (
              <>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">Practice SQL</p>
                    <p className="text-xs text-slate-500 mt-1">Queries are loaded from the Admin CMS. Select part of the editor to run only that SQL.</p>
                  </div>
                  <span className="text-xs text-slate-500">{sql.length.toLocaleString()} chars</span>
                </div>
                <textarea
                  value={sql}
                  onChange={(e) => setSql(e.target.value)}
                  onSelect={(e) => setSelection(e.currentTarget.value.slice(e.currentTarget.selectionStart, e.currentTarget.selectionEnd))}
                  spellCheck="false"
                  placeholder="Enter SQL practice queries from Admin CMS."
                  className="w-full min-h-72 rounded-xl border border-slate-700 bg-[#020617] p-4 font-mono text-sm text-emerald-200 outline-none focus:border-cyan-500"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={run} disabled={running} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold disabled:opacity-50">
                    <Play size={16}/>{running ? 'Running…' : selection.trim() ? 'Run Selected' : 'Run All Queries'}
                  </button>
                  <button type="button" onClick={() => { setSql(starter); setSelection(''); setResult(null); setError(''); }} className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3">
                    <RotateCcw size={15}/> Reset
                  </button>
                  {selection.trim() && <span className="self-center text-xs text-cyan-300">Selected SQL will run</span>}
                </div>
                {error && <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">{error}</div>}
                {result && <div className="mt-5 space-y-5"><div className="text-xs text-slate-500">{results.length} statement(s) · {result.executionMs} ms total</div>{results.map((r, i) => <ResultTable key={r.index || i} result={r} index={i}/>)}</div>}
              </>
            ) : <FallbackPractice resource={fallback} />}
          </div>
          <aside className="border-l border-slate-800 p-5">
            <h4 className="font-semibold">Available Tables</h4>
            {schema?.tables?.length
              ? <ul className="mt-3 space-y-2">{schema.tables.map((t) => <li key={t} className="text-sm text-cyan-300 font-mono">{t}</li>)}</ul>
              : <p className="mt-3 text-sm text-slate-500">Configure SQL_LAB_DATABASE and seed practice tables.</p>}
          </aside>
        </div>
      )}
    </section>
  );
}

function getFallbackResource(lab, resources) {
  const cfg = lab?.config || {};
  if (cfg.githubPath) return { type: inferResourceType(cfg.githubPath), title: inferResourceType(cfg.githubPath) === 'DRIVE' ? 'Drive Material' : inferResourceType(cfg.githubPath) === 'YOUTUBE' ? 'Video' : 'GitHub Code', url: cfg.githubPath };
  const preferred = resources.find((r) => ['GITHUB', 'DRIVE', 'YOUTUBE', 'LINK'].includes(String(r.type || inferResourceType(r?.url)).toUpperCase()));
  if (preferred) return preferred;
  if (lab?.datasetUrl) return { type: inferResourceType(lab.datasetUrl), title: 'Dataset', url: lab.datasetUrl };
  if (lab?.externalUrl) return { type: inferResourceType(lab.externalUrl), title: lab.title || 'Lab Resource', url: lab.externalUrl };
  const colab = resources.find((r) => String(r.type || inferResourceType(r?.url)).toUpperCase() === 'COLAB');
  return colab || resources[0] || null;
}

function resourceLabel(type, index) {
  const t = String(type || 'LINK').toUpperCase();
  if (t === 'GITHUB') return 'GitHub';
  if (t === 'DRIVE') return 'Drive';
  if (t === 'YOUTUBE') return 'Video';
  if (t === 'COLAB') return 'Colab';
  return `Resource ${index}`;
}

function inferResourceType(url = '') {
  const u = String(url).toLowerCase();
  if (u.includes('github.com/')) return 'GITHUB';
  if (u.includes('drive.google.com/') || u.includes('docs.google.com/presentation/') || u.includes('docs.google.com/document/') || u.includes('docs.google.com/spreadsheets/') || u.includes('docs.google.com/')) return 'DRIVE';
  if (u.includes('youtube.com/') || u.includes('youtu.be/')) return 'YOUTUBE';
  if (u.includes('colab.research.google.com/')) return 'COLAB';
  return 'LINK';
}

function drivePreview(url = '') {
  const u = String(url).trim();
  const file = u.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (file) return `https://drive.google.com/file/d/${file[1]}/preview`;
  const slides = u.match(/docs\.google\.com\/presentation\/d\/([^/]+)/i);
  if (slides) return `https://docs.google.com/presentation/d/${slides[1]}/embed`;
  const folder = u.match(/drive\.google\.com\/(?:drive\/)?folders\/([^?/#]+)/i);
  if (folder) return `https://drive.google.com/embeddedfolderview?id=${folder[1]}#list`;
  const doc = u.match(/docs\.google\.com\/document\/d\/([^/]+)/i);
  if (doc) return `https://docs.google.com/document/d/${doc[1]}/preview`;
  const sheet = u.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
  if (sheet) return `https://docs.google.com/spreadsheets/d/${sheet[1]}/preview`;
  return '';
}

function youtubePreview(url = '') {
  const u = String(url).trim();
  const watch = u.match(/youtube\.com\/(?:watch\?v=|shorts\/)([^&?/]+)/i);
  if (watch) return `https://www.youtube-nocookie.com/embed/${watch[1]}?rel=0&modestbranding=1`;
  const short = u.match(/youtu\.be\/([^?&/]+)/i);
  if (short) return `https://www.youtube-nocookie.com/embed/${short[1]}?rel=0&modestbranding=1`;
  if (/youtube(?:-nocookie)?\.com\/embed\//i.test(u)) return u.replace('www.youtube.com', 'www.youtube-nocookie.com');
  return '';
}

function githubBlobUrl(url = '') {
  const u = String(url).trim();
  if (!/^https?:\/\/github\.com\//i.test(u)) return '';
  const parsed = new URL(u);
  const parts = parsed.pathname.split('/').filter(Boolean);
  if (parts.length < 5 || parts[2].toLowerCase() !== 'blob') return '';
  return u;
}

function FallbackPractice({ resource }) {
  if (!resource) return <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6 text-sm text-slate-400">SQL Practice is blank and no embedded resource is configured.</div>;
  return <ResourcePanel resource={resource} />;
}

function ResourcePanel({ resource }) {
  const url = String(resource?.url || '').trim();
  const detectedType = inferResourceType(url);
  const type = (detectedType !== 'LINK' ? detectedType : String(resource?.type || 'LINK')).toUpperCase();

  if (type === 'COLAB' || /colab\.research\.google\.com/i.test(url)) {
    return <div className="p-5 rounded-xl border border-slate-800 bg-slate-900">
      <p className="text-xs uppercase tracking-wider text-cyan-400">Colab</p>
      <h4 className="text-lg font-bold mt-1">{resource.title || 'Google Colab'}</h4>
      {resource.description && <p className="text-sm text-slate-400 mt-2">{resource.description}</p>}
      <a href={url} target="_blank" rel="noreferrer" className="inline-flex mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Open in Colab</a>
    </div>;
  }

  if (type === 'GITHUB') return <GitHubEmbed url={githubBlobUrl(url)} />;

  const src = type === 'DRIVE' ? drivePreview(url) : type === 'YOUTUBE' ? youtubePreview(url) : url;
  if (!src) return <div className="rounded-xl border border-dashed border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">This resource cannot be embedded with the supplied URL.</div>;

  return <div className="p-0">
    {resource.description && <div className="mb-3 text-sm text-slate-400">{resource.description}</div>}
    <SecureFrame title={resource.title || 'Embedded learning resource'} src={src} allow={type === 'YOUTUBE' ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' : 'autoplay'} />
  </div>;
}

function SecureFrame({ title, src, height = 'min-h-[720px]', allow = '' }) {
  return <div className="rounded-xl overflow-hidden border border-slate-800 bg-black">
    <iframe
      title={title}
      src={src}
      className={`w-full ${height} border-0`}
      loading="lazy"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
      allow={allow}
      scrolling="auto"
    />
  </div>;
}

function GitHubEmbed({ url }) {
  const parsed = (() => { try { return new URL(url); } catch { return null; } })();
  const isBlob = Boolean(parsed && parsed.hostname.toLowerCase() === 'github.com' && parsed.pathname.split('/').filter(Boolean)[2]?.toLowerCase() === 'blob');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(url ? 'loading' : 'unsupported');
  const [tree, setTree] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    let active = true;
    if (!url) { setStatus('unsupported'); return () => {}; }
    if (isBlob) {
      setStatus('loading');
      apiRequest('/labs/embed/github', { method: 'POST', body: JSON.stringify({ url }) })
        .then((data) => { if (active) { setCode(String(data?.code || '')); setStatus('ready'); } })
        .catch(() => { if (active) setStatus('error'); });
    } else {
      setStatus('tree-loading');
      apiRequest('/labs/embed/github-tree', { method: 'POST', body: JSON.stringify({ url }) })
        .then((data) => { if (active) { setTree(data); setStatus('tree-ready'); } })
        .catch(() => { if (active) setStatus('error'); });
    }
    return () => { active = false; };
  }, [url, isBlob]);

  const loadFile = async (path) => {
    if (!tree?.owner || !tree?.repo || !path) return;
    setSelectedFile(path);
    setStatus('loading');
    const fileUrl = `https://github.com/${tree.owner}/${tree.repo}/blob/${tree.ref}/${path}`;
    try {
      const data = await apiRequest('/labs/embed/github', { method: 'POST', body: JSON.stringify({ url: fileUrl }) });
      setCode(String(data?.code || ''));
      setStatus('ready');
    } catch {
      setStatus('tree-ready');
    }
  };

  if (status === 'loading') return <div className="p-5 text-sm text-slate-400">Loading embedded GitHub code…</div>;
  if (status === 'tree-loading') return <div className="p-5 text-sm text-slate-400">Loading embedded GitHub files…</div>;
  if (status === 'ready') return <div className="rounded-xl border border-slate-800 overflow-hidden"><div className="px-4 py-3 bg-slate-900 text-sm font-semibold flex items-center justify-between gap-3"><span className="flex items-center gap-2"><FileCode2 size={16}/>Embedded Code</span>{selectedFile && <span className="text-xs text-slate-500 font-mono truncate">{selectedFile}</span>}</div><pre className="max-h-[720px] overflow-auto bg-[#020617] p-5 text-sm text-emerald-200 whitespace-pre-wrap"><code>{code}</code></pre></div>;
  if (status === 'tree-ready' && tree) {
    const files = (tree.entries || []).filter((x) => x.type === 'blob');
    return <div className="rounded-xl border border-slate-800 overflow-hidden"><div className="px-4 py-3 bg-slate-900"><div className="text-sm font-semibold flex items-center gap-2"><FileCode2 size={16}/>Embedded GitHub Files</div><div className="text-xs text-slate-500 mt-1">Browse code inside the Academy without leaving the lesson.</div></div><div className="max-h-[420px] overflow-auto divide-y divide-slate-800">{files.length ? files.map((f) => <button key={f.path} type="button" onClick={() => loadFile(f.path)} className="w-full text-left px-4 py-3 text-sm text-cyan-300 hover:bg-slate-900 font-mono">{f.path}</button>) : <div className="p-5 text-sm text-slate-500">No code files found in this embedded path.</div>}</div></div>;
  }
  if (status === 'unsupported') return <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400">GitHub resource could not be embedded.</div>;
  return <div className="rounded-xl border border-dashed border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">GitHub resource could not be embedded.</div>;
}

function ResultTable({ result, index }) {
  return <div className="overflow-auto rounded-xl border border-slate-800"><div className="p-3 bg-slate-900 border-b border-slate-800"><span className="text-xs text-emerald-400">Query {index + 1}</span><pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap">{result.sql}</pre><div className="mt-2 text-xs text-slate-500">{result.rowCount} rows</div></div>{result.columns?.length ? <table className="w-full text-left text-sm"><thead className="bg-slate-900"><tr>{result.columns.map((c) => <th key={c} className="p-3 text-slate-400">{c}</th>)}</tr></thead><tbody>{result.rows.map((r, i) => <tr key={i} className="border-t border-slate-800">{result.columns.map((c) => <td key={c} className="p-3 text-slate-200">{String(r[c] ?? '')}</td>)}</tr>)}</tbody></table> : <div className="p-4 text-slate-500">Statement completed without tabular output.</div>}</div>;
}
