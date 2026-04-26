import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HeroSection from '@/components/HeroSection';
import HackathonsSection from '@/components/HackathonsSection';
import SkillsSection from '@/components/SkillsSection';
import VisitorCounter from '@/components/VisitorCounter';
import EducationCard from '@/components/EducationCard';
import ExperienceCard from '@/components/ExperienceCard';
import ProjectCard from '@/components/ProjectCard';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    const [skillsSnap, profileSnap, hackSnap, eduSnap, expSnap, projSnap] = await Promise.all([
      getDocs(collection(db, 'skills')),
      getDoc(doc(db, 'profile', 'main')),
      getDocs(query(collection(db, 'hackathons'), orderBy('order', 'asc'))),
      getDocs(query(collection(db, 'education'), orderBy('order', 'asc'))),
      getDocs(query(collection(db, 'experience'), orderBy('order', 'asc'))),
      getDocs(query(collection(db, 'projects'), orderBy('order', 'asc'))),
    ]);
    return {
      skills:     skillsSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
      profile:    profileSnap.exists() ? profileSnap.data() : null,
      hackathons: hackSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
      education:  eduSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
      experience: expSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
      projects:   projSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    };
  } catch {
    return { skills: [], profile: null, hackathons: [], education: [], experience: [], projects: [] };
  }
}

export default async function HomePage() {
  const { skills, profile, hackathons, education, experience, projects } = await getData();

  return (
    <>
      {/* Hero */}
      <section id="home">
        <HeroSection profile={profile} />
      </section>

      {/* Education */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <PageHeader badge="Academic" title="My" highlight="Education"
            description="The academic foundations that built my technical thinking." />
          <div className="mt-12 flex flex-col gap-6">
            {education.length > 0
              ? education.map((edu, i) => <EducationCard key={edu.id} edu={edu} index={i} />)
              : <p className="text-center text-slate-500">No education added yet.</p>}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <PageHeader badge="Career" title="Work" highlight="Experience"
            description="My professional journey and the roles that shaped my skills." />
          <div className="mt-12">
            {experience.length > 0
              ? experience.map((exp, i) => <ExperienceCard key={exp.id} exp={exp} index={i} />)
              : <p className="text-center text-slate-500">No experience added yet.</p>}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <PageHeader badge="My Work" title="Featured" highlight="Projects"
            description="A collection of things I've built — from side projects to production apps." />
          {projects.length > 0
            ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
              </div>
            : <p className="text-center text-slate-500 mt-12">No projects yet.</p>}
        </div>
      </section>

      {/* Hackathons */}
      <section id="hackathons">
        <HackathonsSection hackathons={hackathons} />
      </section>

      {/* Skills */}
      <section id="skills">
        <SkillsSection skills={skills} />
      </section>

      <VisitorCounter />
    </>
  );
}
