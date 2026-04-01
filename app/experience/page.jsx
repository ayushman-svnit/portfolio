import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ExperienceCard from '@/components/ExperienceCard';
import PageHeader from '@/components/PageHeader';

async function getExperience() {
  try {
    const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export const metadata = { title: 'Experience | Portfolio' };

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          badge="Career"
          title="Work"
          highlight="Experience"
          description="My professional journey and the roles that shaped my skills."
        />
        <div className="mt-12">
          {experience.length > 0 ? (
            experience.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))
          ) : (
            <p className="text-center text-slate-500 mt-20">No experience added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
