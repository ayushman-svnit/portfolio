import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import EducationCard from '@/components/EducationCard';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getEducation() {
  try {
    const q = query(collection(db, 'education'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export const metadata = { title: 'Education | Portfolio' };

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          badge="Academic"
          title="My"
          highlight="Education"
          description="The academic foundations that built my technical thinking."
        />
        <div className="mt-12 flex flex-col gap-6">
          {education.length > 0 ? (
            education.map((edu, i) => (
              <EducationCard key={edu.id} edu={edu} index={i} />
            ))
          ) : (
            <p className="text-center text-slate-500 mt-20">No education added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
