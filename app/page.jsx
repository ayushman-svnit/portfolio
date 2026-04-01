import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';

async function getData() {
  try {
    const [skillsSnap, profileSnap] = await Promise.all([
      getDocs(collection(db, 'skills')),
      getDoc(doc(db, 'profile', 'main')),
    ]);
    const skills = skillsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const profile = profileSnap.exists() ? profileSnap.data() : null;
    return { skills, profile };
  } catch {
    return { skills: [], profile: null };
  }
}

export default async function HomePage() {
  const { skills, profile } = await getData();

  return (
    <>
      <HeroSection profile={profile} />
      <SkillsSection skills={skills} />
    </>
  );
}
