import {useEffect,useState} from 'react';
import AdminLayout from '../layouts/AdminLayout';
import {cms} from '../services/cmsService';
import {Input,Textarea,Select,EditorIntro} from '../components/CmsUI';

function normalizeKeywords(value){
  if(!value) return '';
  if(Array.isArray(value)) return value.join(', ');
  if(typeof value !== 'string') return '';
  const text=value.trim();
  if(!text) return '';
  try{
    const parsed=JSON.parse(text);
    if(Array.isArray(parsed)) return parsed.join(', ');
    if(typeof parsed === 'string') return parsed;
  }catch{
    // Older records may contain plain comma-separated text instead of JSON.
  }
  return text;
}

export default function SeoCMS(){
  const[data,setData]=useState({siteName:'',defaultTitle:'',defaultDescription:'',defaultKeywords:'',defaultImage:'',defaultRobots:'index,follow',googleVerification:'',bingVerification:'',analyticsId:''});
  const[error,setError]=useState(''),[saved,setSaved]=useState(false);
  useEffect(()=>{
    cms.seo.get().then(x=>setData({
      siteName:x.site_name||'',
      defaultTitle:x.default_title||'',
      defaultDescription:x.default_description||'',
      defaultKeywords:normalizeKeywords(x.default_keywords),
      defaultImage:x.default_image||'',
      defaultRobots:x.default_robots||'index,follow',
      googleVerification:x.google_verification||'',
      bingVerification:x.bing_verification||'',
      analyticsId:x.analytics_id||''
    })).catch(e=>setError(e.message));
  },[]);
const save=async e=>{e.preventDefault();try{await cms.seo.update(data);setSaved(true);setTimeout(()=>setSaved(false),2500)}catch(e){setError(e.message)}};return <AdminLayout><div className="max-w-5xl space-y-6"><div><h1 className="text-4xl font-bold">Global SEO</h1><p className="text-slate-400 mt-2">Default SEO, verification and analytics settings.</p></div>{error&&<div className="p-4 rounded-xl bg-red-500/10 text-red-400">{error}</div>}{saved&&<div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400">SEO settings saved.</div>}<EditorIntro title="Global SEO guide">These are site-wide defaults. Example: Site Name = Infinity AI Cloud Academy, Default Title = AI, Data Engineering & Cloud Courses, Default Description = practical learning programs... Keep verification IDs exactly as provided by Google/Bing and do not add extra text.</EditorIntro><form onSubmit={save} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 space-y-5"><div className="grid md:grid-cols-2 gap-5"><Input label="Site Name" example="Infinity AI Cloud Academy" value={data.siteName} onChange={e=>setData({...data,siteName:e.target.value})}/><Input label="Default Title" example="AI, Data Engineering & Cloud Courses | Infinity AI Cloud Academy" value={data.defaultTitle} onChange={e=>setData({...data,defaultTitle:e.target.value})}/><Input label="Default Image URL" example="https://infinityaicloudacademy.com/images/og-default.jpg" value={data.defaultImage} onChange={e=>setData({...data,defaultImage:e.target.value})}/><Select label="Default Robots" value={data.defaultRobots} onChange={e=>setData({...data,defaultRobots:e.target.value})}><option>index,follow</option><option>noindex,follow</option></Select><Input label="Google Verification" help="Paste only the verification value from Google Search Console." example="abc123..." value={data.googleVerification} onChange={e=>setData({...data,googleVerification:e.target.value})}/><Input label="Bing Verification" help="Paste only the verification value from Bing Webmaster Tools." example="xyz789..." value={data.bingVerification} onChange={e=>setData({...data,bingVerification:e.target.value})}/><Input label="Analytics ID" help="Use your measurement ID if your analytics integration expects it." example="G-XXXXXXXXXX" value={data.analyticsId} onChange={e=>setData({...data,analyticsId:e.target.value})}/></div><Textarea label="Default Description" rows={4} maxLength={160} example="Learn AI, Data Engineering, Python, SQL and Google Cloud through practical projects and career-focused training." value={data.defaultDescription} onChange={e=>setData({...data,defaultDescription:e.target.value})}/><Input label="Default Keywords (comma separated)" example="AI course, data engineering, python course, cloud computing" value={data.defaultKeywords} onChange={e=>setData({...data,defaultKeywords:e.target.value})}/><button className="px-7 py-3 rounded-xl bg-blue-600 font-semibold">Save SEO Settings</button></form><div className="rounded-2xl border border-slate-700 p-6 text-slate-300"><h2 className="text-xl font-bold text-white">SEO workflow</h2><p className="mt-3">Course, post and page editors each have their own Meta Title, Description, Focus Keyword, Keywords, Canonical, Open Graph, Robots and optional Schema JSON.</p></div></div></AdminLayout>}
