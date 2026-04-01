'use server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function verifyAdminPassword(password) {
  try {
    const snap = await getDoc(doc(db, 'config', 'admin'));
    if (!snap.exists()) return { error: 'Admin not configured in Firestore.' };
    const { password: stored } = snap.data();
    // trim both sides to avoid whitespace issues
    if (password.trim() === stored.trim()) return { success: true };
    return { error: `Wrong password (got ${password.length} chars, expected ${stored.length} chars)` };
  } catch (e) {
    return { error: 'Firebase error: ' + e.message };
  }
}
