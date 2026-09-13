export function FieldGuide({ title='Example', children, tone='blue' }) {
  const toneClass = tone === 'green' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-200' : tone === 'amber' ? 'border-amber-500/20 bg-amber-500/5 text-amber-100' : 'border-blue-500/20 bg-blue-500/5 text-blue-100';
  return <div className={`mt-2 rounded-lg border px-3 py-2 text-xs leading-5 ${toneClass}`}><strong className="text-white">{title}: </strong>{children}</div>;
}

export function Input({ label, help, example, maxLength, ...props }) {
  const value = props.value ?? '';
  return <div className="block space-y-2"><label className="block space-y-2"><span className="text-sm text-slate-300">{label}{maxLength ? <span className="float-right text-xs text-slate-500">{String(value).length}/{maxLength}</span> : null}</span><input {...props} maxLength={maxLength} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500" /></label>{help&&<p className="text-xs text-slate-500">{help}</p>}{example&&<FieldGuide>{example}</FieldGuide>}</div>;
}
export function Textarea({ label, help, example, maxLength, ...props }) {
  const value = props.value ?? '';
  return <div className="block space-y-2"><label className="block space-y-2"><span className="text-sm text-slate-300">{label}{maxLength ? <span className="float-right text-xs text-slate-500">{String(value).length}/{maxLength}</span> : null}</span><textarea {...props} maxLength={maxLength} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500" /></label>{help&&<p className="text-xs text-slate-500">{help}</p>}{example&&<FieldGuide>{example}</FieldGuide>}</div>;
}
export function Select({ label, help, example, children, ...props }) {
  return <div className="block space-y-2"><label className="block space-y-2"><span className="text-sm text-slate-300">{label}</span><select {...props} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500">{children}</select></label>{help&&<p className="text-xs text-slate-500">{help}</p>}{example&&<FieldGuide>{example}</FieldGuide>}</div>;
}

export function EditorIntro({ title, children }) {
  return <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5"><div className="flex items-start gap-3"><div className="text-xl">💡</div><div><h3 className="font-semibold text-white">{title || 'How to fill this form'}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{children}</p></div></div></div>;
}

export function SeoFields({ value, onChange }) {
  const set = (key, val) => onChange({ ...value, [key]: val });
  const title = value.title || '';
  const description = value.description || '';
  const focusKeyword = value.focusKeyword || '';
  const keywords = value.keywords || [];
  const previewTitle = title || 'Example: Data Engineering Course | Infinity AI Cloud Academy';
  const previewDescription = description || 'Example: Learn Data Engineering with Python, SQL, PySpark and BigQuery through a practical course.';
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 space-y-5">
    <div><h2 className="text-xl font-bold">SEO Settings</h2><p className="mt-1 text-sm text-slate-400">Fill these fields to control how this page can appear in Google and when shared on social media.</p></div>
    <EditorIntro title="SEO filling example">Use a specific search phrase, write a natural title, and explain the page clearly. Avoid keyword stuffing. If you leave optional fields empty, the website can use safe defaults.</EditorIntro>
    <div className="grid md:grid-cols-2 gap-5">
      <Input label="Meta Title" value={title} maxLength={60} onChange={e=>set('title',e.target.value)} placeholder="50–60 characters" help="Keep it unique and close to 50–60 characters." example="Data Engineering Course – Python, SQL & PySpark" />
      <Input label="Focus Keyword" value={focusKeyword} onChange={e=>set('focusKeyword',e.target.value)} placeholder="data engineering course" help="The main phrase you want this page to target." example="data engineering course" />
    </div>
    <Textarea label="Meta Description" rows={3} value={description} maxLength={160} onChange={e=>set('description',e.target.value)} placeholder="150–160 characters" help="Write for humans: what is this page about and why should someone click?" example="Learn Data Engineering with Python, SQL, PySpark and BigQuery through practical projects at Infinity AI Cloud Academy." />
    <Input label="Keywords (comma separated)" value={keywords.join(', ')} onChange={e=>set('keywords',e.target.value.split(',').map(x=>x.trim()).filter(Boolean))} help="Add a few closely related terms. Do not repeat the same keyword many times." example="data engineering, python, sql, pyspark, bigquery" />
    <div className="grid md:grid-cols-2 gap-5">
      <Input label="Canonical URL" value={value.canonicalUrl || ''} onChange={e=>set('canonicalUrl',e.target.value)} help="Normally the final preferred URL of this page." example="https://infinityaicloudacademy.com/courses/data-engineering" />
      <Select label="Robots" value={value.robots || 'index,follow'} onChange={e=>set('robots',e.target.value)} help="Use noindex only when you intentionally do not want search engines to index the page."><option>index,follow</option><option>noindex,follow</option><option>index,nofollow</option><option>noindex,nofollow</option></Select>
      <Input label="OG Title" value={value.ogTitle || ''} onChange={e=>set('ogTitle',e.target.value)} help="Title used when the URL is shared on Facebook/LinkedIn etc." example="Master Data Engineering – Practical Career Course" />
      <Input label="OG Image URL" value={value.ogImage || ''} onChange={e=>set('ogImage',e.target.value)} help="Use a public image URL, ideally a 1200×630 social image." example="https://infinityaicloudacademy.com/images/data-engineering-og.jpg" />
    </div>
    <Textarea label="OG Description" rows={2} value={value.ogDescription || ''} onChange={e=>set('ogDescription',e.target.value)} example="Build job-ready Data Engineering skills with Python, SQL, PySpark and Google Cloud." />
    <Textarea label="Custom Schema JSON (optional)" rows={6} value={value.schemaJson || ''} onChange={e=>set('schemaJson',e.target.value)} placeholder='{"@context":"https://schema.org","@type":"Course"}' help="Only use valid JSON. Leave blank if you are not sure; the app already provides supported schema where applicable." example='{"@context":"https://schema.org","@type":"Course","name":"Data Engineering Course"}' />
    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Google-style preview</p><p className="mt-2 text-lg text-blue-400 truncate">{previewTitle}</p><p className="text-xs text-emerald-400 mt-1">infinityaicloudacademy.com</p><p className="text-sm text-slate-300 mt-1 line-clamp-2">{previewDescription}</p></div>
  </div>;
}
export const emptySeo = () => ({ title:'', description:'', focusKeyword:'', keywords:[], canonicalUrl:'', ogTitle:'', ogDescription:'', ogImage:'', robots:'index,follow', schemaJson:'' });
