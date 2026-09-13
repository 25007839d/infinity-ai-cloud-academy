export function Input({ label, ...props }) {
  return <label className="block space-y-2"><span className="text-sm text-slate-300">{label}</span><input {...props} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500" /></label>;
}
export function Textarea({ label, ...props }) {
  return <label className="block space-y-2"><span className="text-sm text-slate-300">{label}</span><textarea {...props} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500" /></label>;
}
export function Select({ label, children, ...props }) {
  return <label className="block space-y-2"><span className="text-sm text-slate-300">{label}</span><select {...props} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500">{children}</select></label>;
}
export function SeoFields({ value, onChange }) {
  const set = (key, val) => onChange({ ...value, [key]: val });
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 space-y-5">
    <h2 className="text-xl font-bold">SEO Settings</h2>
    <div className="grid md:grid-cols-2 gap-5">
      <Input label="Meta Title" value={value.title || ''} onChange={e=>set('title',e.target.value)} placeholder="50–60 characters" />
      <Input label="Focus Keyword" value={value.focusKeyword || ''} onChange={e=>set('focusKeyword',e.target.value)} />
    </div>
    <Textarea label="Meta Description" rows={3} value={value.description || ''} onChange={e=>set('description',e.target.value)} placeholder="150–160 characters" />
    <Input label="Keywords (comma separated)" value={(value.keywords || []).join(', ')} onChange={e=>set('keywords',e.target.value.split(',').map(x=>x.trim()).filter(Boolean))} />
    <div className="grid md:grid-cols-2 gap-5">
      <Input label="Canonical URL" value={value.canonicalUrl || ''} onChange={e=>set('canonicalUrl',e.target.value)} />
      <Select label="Robots" value={value.robots || 'index,follow'} onChange={e=>set('robots',e.target.value)}><option>index,follow</option><option>noindex,follow</option><option>index,nofollow</option><option>noindex,nofollow</option></Select>
      <Input label="OG Title" value={value.ogTitle || ''} onChange={e=>set('ogTitle',e.target.value)} />
      <Input label="OG Image URL" value={value.ogImage || ''} onChange={e=>set('ogImage',e.target.value)} />
    </div>
    <Textarea label="OG Description" rows={2} value={value.ogDescription || ''} onChange={e=>set('ogDescription',e.target.value)} />
    <Textarea label="Custom Schema JSON (optional)" rows={5} value={value.schemaJson || ''} onChange={e=>set('schemaJson',e.target.value)} placeholder='{"@context":"https://schema.org"}' />
  </div>;
}
export const emptySeo = () => ({ title:'', description:'', focusKeyword:'', keywords:[], canonicalUrl:'', ogTitle:'', ogDescription:'', ogImage:'', robots:'index,follow', schemaJson:'' });
