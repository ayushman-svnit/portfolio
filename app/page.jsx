import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HeroSection from '@/components/HeroSection';
import HackathonsSection from '@/components/HackathonsSection';
import SkillsSection from '@/components/SkillsSection';
import VisitorCounter from '@/components/VisitorCounter';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    const [skillsSnap, profileSnap, hackSnap] = await Promise.all([
      getDocs(collection(db, 'skills')),
      getDoc(doc(db, 'profile', 'main')),
      getDocs(query(collection(db, 'hackathons'), orderBy('order', 'asc'))),
    ]);
    return {
      skills: skillsSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
      profile: profileSnap.exists() ? profileSnap.data() : null,
      hackathons: hackSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    };
  } catch {
    return { skills: [], profile: null, hackathons: [] };
  }
}

export default async function HomePage() {
  const { skills, profile, hackathons } = await getData();

  return (
    <>
      <HeroSection profile={profile} />
      <HackathonsSection hackathons={hackathons} />
      <SkillsSection skills={skills} />
      <VisitorCounter />
    </>
  );
}
