import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from '@/components/ProjectCard';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProjects() {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export const metadata = { title: 'Projects | Portfolio' };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          badge="My Work"
          title="Featured"
          highlight="Projects"
          description="A collection of things I've built — from side projects to production apps."
        />
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 mt-20">No projects yet. Add them from the admin panel.</p>
        )}
      </div>
    </div>
  );
}
