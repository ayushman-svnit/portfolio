/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, Lock, LogOut, Code2, Briefcase, GraduationCap, Zap, User, Trophy } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "hackathons", label: "Hackathons", icon: Trophy },
  { id: "skills", label: "Skills", icon: Zap },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [data, setData] = useState({ projects: [], experience: [], education: [], skills: [], hackathons: [], profile: {} });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setMsg("Checking...");
    try {
      const snap = await getDoc(doc(db, "config", "admin"));
      if (!snap.exists()) { setMsg("No admin doc found"); return; }
      const stored = snap.data().password;
      if (pass.trim() === stored.trim()) { setAuthed(true); setMsg(""); }
      else { setMsg("typed:" + pass.length + " stored:" + stored.length); }
    } catch (err) { setMsg("ERR:" + err.message); }
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [proj, exp, edu, skills, profileSnap, hackSnap] = await Promise.all([
        getDocs(query(collection(db, "projects"), orderBy("order", "asc"))),
        getDocs(query(collection(db, "experience"), orderBy("order", "asc"))),
        getDocs(query(collection(db, "education"), orderBy("order", "asc"))),
        getDocs(collection(db, "skills")),
        getDocs(collection(db, "profile")),
        getDocs(query(collection(db, "hackathons"), orderBy("order", "asc"))),
      ]);
      setData({
        projects: proj.docs.map((d) => ({ id: d.id, ...d.data() })),
        experience: exp.docs.map((d) => ({ id: d.id, ...d.data() })),
        education: edu.docs.map((d) => ({ id: d.id, ...d.data() })),
        skills: skills.docs.map((d) => ({ id: d.id, ...d.data() })),
        hackathons: hackSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
        profile: profileSnap.docs[0]?.data() || {},
      });
    } catch (e) { setMsg("Fetch error: " + e.message); }
    setLoading(false);
  };

  useEffect(() => { if (authed) fetchAll(); }, [authed]);
  const notify = (m) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };
  const deleteItem = async (col, id) => { await deleteDoc(doc(db, col, id)); notify("Deleted"); fetchAll(); };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass border border-white/10 rounded-2xl p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Lock size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <form onSubmit={login} className="flex flex-col gap-4">
            <input type="password" placeholder="Enter admin password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors" />
            {msg && <p className="text-rose-400 text-sm break-all">{msg}</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black gradient-text">Admin Panel</h1>
          <button onClick={() => setAuthed(false)} className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"><LogOut size={15} /> Logout</button>
        </div>
        {msg && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-3 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm">{msg}</motion.div>}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={"flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 " + (activeTab === id ? "bg-gradient-to-r from-primary to-secondary text-white" : "glass border border-white/10 text-slate-400 hover:text-white")}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>
        {loading ? <div className="text-center text-slate-500 py-20">Loading...</div> : (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {activeTab === "profile" && <ProfileForm profile={data.profile} onSave={fetchAll} notify={notify} />}
              {activeTab === "projects" && <ProjectsAdmin items={data.projects} onDelete={(id) => deleteItem("projects", id)} onSave={fetchAll} notify={notify} />}
              {activeTab === "experience" && <ExperienceAdmin items={data.experience} onDelete={(id) => deleteItem("experience", id)} onSave={fetchAll} notify={notify} />}
              {activeTab === "education" && <EducationAdmin items={data.education} onDelete={(id) => deleteItem("education", id)} onSave={fetchAll} notify={notify} />}
              {activeTab === "skills" && <SkillsAdmin items={data.skills} onDelete={(id) => deleteItem("skills", id)} onSave={fetchAll} notify={notify} />}
              {activeTab === "hackathons" && <HackathonsAdmin items={data.hackathons} onDelete={(id) => deleteItem("hackathons", id)} onSave={fetchAll} notify={notify} />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}


function ProfileForm({ profile, onSave, notify }) {
  const [form, setForm] = useState({ name: "", title: "", bio: "", github: "", linkedin: "", email: "", avatar: "", ...profile });
  useEffect(() => { setForm({ name: "", title: "", bio: "", github: "", linkedin: "", email: "", avatar: "", ...profile }); }, [profile]);
  const save = async (e) => { e.preventDefault(); await setDoc(doc(db, "profile", "main"), form); notify("Profile saved!"); onSave(); };
  const fields = [{k:"name",p:"Your Name"},{k:"title",p:"Title"},{k:"github",p:"GitHub URL"},{k:"linkedin",p:"LinkedIn URL"},{k:"email",p:"Email"}];
  return (
    <form onSubmit={save} className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold mb-2">Edit Profile</h2>
      {fields.map(({k,p}) => <input key={k} placeholder={p} value={form[k]} onChange={(e) => setForm({...form,[k]:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm" />)}
      <textarea placeholder="Bio" value={form.bio} onChange={(e) => setForm({...form,bio:e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm resize-none" />
      <ImageUpload value={form.avatar} onChange={(url) => setForm({...form,avatar:url})} label="Profile Photo" />
      <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 w-fit"><Save size={15} />Save Profile</button>
    </form>
  );
}

function ProjectsAdmin({ items, onDelete, onSave, notify }) {
  const empty = { title:"",subtitle:"",description:"",keyFeatures:"",tech:"",github:"",live:"",image:"",status:"Completed",featured:false,order:0,duration:"" };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const startEdit = (p) => {
    setEditId(p.id);
    setForm({
      title: p.title || "",
      subtitle: p.subtitle || "",
      description: p.description || "",
      keyFeatures: Array.isArray(p.keyFeatures) ? p.keyFeatures.join("\n") : (p.keyFeatures || ""),
      tech: Array.isArray(p.tech) ? p.tech.join(", ") : (p.tech || ""),
      github: p.github || "",
      live: p.live || "",
      image: p.image || "",
      status: p.status || "Completed",
      featured: p.featured || false,
      order: p.order ?? 0,
      duration: p.duration || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setEditId(null); setForm(empty); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tech: form.tech.split(",").map(t=>t.trim()).filter(Boolean), keyFeatures: form.keyFeatures.split("\n").filter(Boolean), order: Number(form.order) };
    if (editId) {
      await setDoc(doc(db, "projects", editId), { ...payload, updatedAt: serverTimestamp() }, { merge: true });
      notify("Project updated!"); setEditId(null);
    } else {
      await addDoc(collection(db, "projects"), { ...payload, createdAt: serverTimestamp() });
      notify("Project added!");
    }
    setForm(empty); onSave();
  };

  const fields = [{k:"title",p:"Title",r:true},{k:"subtitle",p:"Subtitle"},{k:"description",p:"Description"},{k:"keyFeatures",p:"Key Features (one per line)"},{k:"tech",p:"Tech (comma separated)"},{k:"github",p:"GitHub URL"},{k:"live",p:"Live URL"},{k:"duration",p:"Duration (e.g. Jan 2024  or  Jan 2024 - Mar 2025)"},{k:"order",p:"Display order (1, 2, 3...)"}];

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{editId ? "Edit Project" : "Add Project"}</h2>
          {editId && <button type="button" onClick={cancelEdit} className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded-lg glass border border-white/10 transition-colors">Cancel</button>}
        </div>
        {fields.map(({k,p,r}) => k === "keyFeatures"
          ? <textarea key={k} placeholder={p} value={form[k]} onChange={(e) => setForm({...form,[k]:e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm resize-none" />
          : <input key={k} placeholder={p} value={form[k]} required={r} onChange={(e) => setForm({...form,[k]:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm" />
        )}
        <select value={form.status} onChange={(e) => setForm({...form,status:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm">
          {["Completed","In Progress","Planned"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <ImageUpload value={form.image} onChange={(url) => setForm({...form,image:url})} label="Project Image" />
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form,featured:e.target.checked})} className="accent-primary" />Featured</label>
        <button type="submit" className={"flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 w-fit " + (editId ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-primary to-secondary")}>
          {editId ? <><Save size={15} />Update Project</> : <><Plus size={15} />Add Project</>}
        </button>
      </form>
      <ItemList items={items} onDelete={onDelete} onEdit={startEdit} renderItem={(p) => (
        <div><p className="font-semibold text-white">{p.title}</p><p className="text-slate-400 text-xs mt-1">{p.description?.slice(0,80)}</p></div>
      )} />
    </div>
  );
}

function ExperienceAdmin({ items, onDelete, onSave, notify }) {
  const empty = { role:"",company:"",duration:"",location:"",description:"",responsibilities:"",skills:"",order:0 };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const startEdit = (e) => {
    setEditId(e.id);
    setForm({
      role: e.role||"", company: e.company||"", duration: e.duration||"",
      location: e.location||"", description: e.description||"",
      responsibilities: Array.isArray(e.responsibilities) ? e.responsibilities.join("\n") : (e.responsibilities||""),
      skills: Array.isArray(e.skills) ? e.skills.join(", ") : (e.skills||""),
      order: e.order??0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = () => { setEditId(null); setForm(empty); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, responsibilities: form.responsibilities.split("\n").filter(Boolean), skills: form.skills.split(",").map(s=>s.trim()).filter(Boolean), order: Number(form.order) };
    if (editId) { await setDoc(doc(db,"experience",editId), payload, { merge: true }); notify("Experience updated!"); setEditId(null); }
    else { await addDoc(collection(db,"experience"), payload); notify("Experience added!"); }
    setForm(empty); onSave();
  };

  const fields = [{k:"role",p:"Role",r:true},{k:"company",p:"Company",r:true},{k:"duration",p:"Duration (e.g. May 2025 - Jun 2025)"},{k:"location",p:"Location"},{k:"description",p:"Short description"},{k:"responsibilities",p:"Key Responsibilities (one per line)"},{k:"skills",p:"Skills (comma separated)"},{k:"order",p:"Order (0=first)"}];
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{editId ? "Edit Experience" : "Add Experience"}</h2>
          {editId && <button type="button" onClick={cancelEdit} className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded-lg glass border border-white/10 transition-colors">Cancel</button>}
        </div>
        {fields.map(({k,p,r}) => k === "responsibilities"
          ? <textarea key={k} placeholder={p} value={form[k]} onChange={(e) => setForm({...form,[k]:e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm resize-none" />
          : <input key={k} placeholder={p} value={form[k]} required={r} onChange={(e) => setForm({...form,[k]:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm" />
        )}
        <button type="submit" className={"flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 w-fit " + (editId ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-primary to-secondary")}>
          {editId ? <><Save size={15} />Update Experience</> : <><Plus size={15} />Add Experience</>}
        </button>
      </form>
      <ItemList items={items} onDelete={onDelete} onEdit={startEdit} renderItem={(e) => <div><p className="font-semibold text-white">{e.role} @ {e.company}</p><p className="text-slate-400 text-xs">{e.duration}</p></div>} />
    </div>
  );
}

function EducationAdmin({ items, onDelete, onSave, notify }) {
  const empty = { degree:"",specialization:"",institution:"",duration:"",location:"",description:"",highlights:"",courses:"",status:"Currently Pursuing",order:0 };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const startEdit = (e) => {
    setEditId(e.id);
    setForm({
      degree: e.degree||"", specialization: e.specialization||"", institution: e.institution||"",
      duration: e.duration||"", location: e.location||"", description: e.description||"",
      highlights: Array.isArray(e.highlights) ? e.highlights.join("\n") : (e.highlights||""),
      courses: Array.isArray(e.courses) ? e.courses.join(", ") : (e.courses||""),
      status: e.status||"Currently Pursuing", order: e.order??0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = () => { setEditId(null); setForm(empty); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, highlights: form.highlights.split("\n").filter(Boolean), courses: form.courses.split(",").map(c=>c.trim()).filter(Boolean), order: Number(form.order) };
    if (editId) { await setDoc(doc(db,"education",editId), payload, { merge: true }); notify("Education updated!"); setEditId(null); }
    else { await addDoc(collection(db,"education"), payload); notify("Education added!"); }
    setForm(empty); onSave();
  };

  const fields = [{k:"degree",p:"Degree (e.g. Bachelor of Technology)",r:true},{k:"specialization",p:"Specialization (e.g. Computer Science & Engineering)"},{k:"institution",p:"Institution Name",r:true},{k:"duration",p:"Duration (e.g. 2024 - 2028)"},{k:"location",p:"Location"},{k:"description",p:"Short description"},{k:"highlights",p:"Key Highlights (one per line)"},{k:"courses",p:"Relevant Courses (comma separated)"},{k:"order",p:"Order"}];
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{editId ? "Edit Education" : "Add Education"}</h2>
          {editId && <button type="button" onClick={cancelEdit} className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded-lg glass border border-white/10 transition-colors">Cancel</button>}
        </div>
        {fields.map(({k,p,r}) => k === "highlights"
          ? <textarea key={k} placeholder={p} value={form[k]} onChange={(e) => setForm({...form,[k]:e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm resize-none" />
          : <input key={k} placeholder={p} value={form[k]} required={r} onChange={(e) => setForm({...form,[k]:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm" />
        )}
        <select value={form.status} onChange={(e) => setForm({...form,status:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm">
          {["Currently Pursuing","Completed"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="submit" className={"flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 w-fit " + (editId ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-primary to-secondary")}>
          {editId ? <><Save size={15} />Update Education</> : <><Plus size={15} />Add Education</>}
        </button>
      </form>
      <ItemList items={items} onDelete={onDelete} onEdit={startEdit} renderItem={(e) => <div><p className="font-semibold text-white">{e.degree}</p><p className="text-slate-400 text-xs">{e.institution} - {e.duration}</p></div>} />
    </div>
  );
}

function SkillsAdmin({ items, onDelete, onSave, notify }) {
  const empty = { name:"",category:"Programming Languages",level:5 };
  const [form, setForm] = useState(empty);
  const cats = ["Programming Languages","Web Development","Data Structures & Algorithms","Tools & Technologies","Core Subjects","ML Frameworks & Libraries"];
  const add = async (e) => { e.preventDefault(); await addDoc(collection(db,"skills"),{...form,level:Number(form.level)}); setForm(empty); notify("Skill added!"); onSave(); };
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={add} className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Add Skill</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Skill name (e.g. React.js)" value={form.name} required onChange={(e) => setForm({...form,name:e.target.value})}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm" />
          <select value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}
            className="px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm">
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-slate-400 text-sm whitespace-nowrap">Level: {form.level} / 10</label>
          <input type="range" min={1} max={10} value={form.level} onChange={(e) => setForm({...form,level:e.target.value})} className="flex-1 accent-primary" />
        </div>
        <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 w-fit"><Plus size={15} />Add Skill</button>
      </form>
      <ItemList items={items} onDelete={onDelete} renderItem={(s) => (
        <div className="flex items-center justify-between gap-4 w-full">
          <div><p className="font-semibold text-white">{s.name}</p><p className="text-slate-400 text-xs">{s.category}</p></div>
          <span className="text-primary text-sm font-mono flex-shrink-0">{s.level}/10</span>
        </div>
      )} />
    </div>
  );
}

function HackathonsAdmin({ items, onDelete, onSave, notify }) {
  const empty = { name:"", organizer:"", date:"", location:"", position:"", teamSize:"", description:"", tags:"", order:0 };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const startEdit = (h) => {
    setEditId(h.id);
    setForm({
      name: h.name||"", organizer: h.organizer||"", date: h.date||"",
      location: h.location||"", position: h.position||"", teamSize: h.teamSize||"",
      description: h.description||"",
      tags: Array.isArray(h.tags) ? h.tags.join(", ") : (h.tags||""),
      order: h.order??0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = () => { setEditId(null); setForm(empty); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean), order: Number(form.order) };
    if (editId) { await setDoc(doc(db,"hackathons",editId), payload, { merge: true }); notify("Hackathon updated!"); setEditId(null); }
    else { await addDoc(collection(db,"hackathons"), payload); notify("Hackathon added!"); }
    setForm(empty); onSave();
  };

  const positions = ["Winner", "1st Runner Up", "2nd Runner Up", "Finalist", "Participant"];
  const fields = [
    {k:"name",p:"Hackathon Name",r:true},
    {k:"organizer",p:"Organizer / Host"},
    {k:"date",p:"Date (e.g. Jan 2025 or Jan - Feb 2025)"},
    {k:"location",p:"Location (e.g. Online / Delhi, India)"},
    {k:"teamSize",p:"Team Size (e.g. 3)"},
    {k:"description",p:"Short description of what you built"},
    {k:"tags",p:"Tags (comma separated: React, AI, Hackathon)"},
    {k:"order",p:"Display order"},
  ];

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{editId ? "Edit Hackathon" : "Add Hackathon"}</h2>
          {editId && <button type="button" onClick={cancelEdit} className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded-lg glass border border-white/10 transition-colors">Cancel</button>}
        </div>
        {fields.map(({k,p,r}) => (
          <input key={k} placeholder={p} value={form[k]} required={r} onChange={(e) => setForm({...form,[k]:e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 text-sm" />
        ))}
        <select value={form.position} onChange={(e) => setForm({...form,position:e.target.value})}
          className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm">
          <option value="">Select Position / Achievement</option>
          {positions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button type="submit" className={"flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 w-fit " + (editId ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-primary to-secondary")}>
          {editId ? <><Save size={15}/>Update Hackathon</> : <><Plus size={15}/>Add Hackathon</>}
        </button>
      </form>
      <ItemList items={items} onDelete={onDelete} onEdit={startEdit} renderItem={(h) => (
        <div>
          <p className="font-semibold text-white">{h.name}</p>
          <p className="text-slate-400 text-xs mt-0.5">{h.position && <span className="text-primary mr-2">{h.position}</span>}{h.date}</p>
        </div>
      )} />
    </div>
  );
}

function ItemList({ items, onDelete, onEdit, renderItem }) {
  if (!items.length) return <p className="text-slate-500 text-sm text-center py-8">No items yet.</p>;
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">{renderItem(item)}</div>
          <div className="flex gap-2 flex-shrink-0">
            {onEdit && (
              <button onClick={() => onEdit(item)} className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <Save size={14} />
              </button>
            )}
            <button onClick={() => onDelete(item.id)} className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
