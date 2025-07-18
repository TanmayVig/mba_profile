// app/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore instance
export const db = getFirestore(app);

// Function to get data from 'vira/restraunts'
export async function getRestraunts() {
  const docRef = doc(db, "vira", "restraunts");
  console.log("DB", db.toJSON());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

// Function to set data to 'vira/restraunts'
export async function setRestraunts(data: any) {
  const docRef = doc(db, "vira", "restraunts");
  await setDoc(docRef, data, { merge: true });
}

export async function updateRestraunt(id: string, newRemark: string) {
  const docRef = doc(db, "vira", "restraunts");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return;

  const data = docSnap.data();
  if (!Array.isArray(data.restrauntsList)) return;

  const updatedList = data.restrauntsList.map((r: any) =>
    r.id === id ? { ...r, remark: newRemark } : r
  );

  await setDoc(docRef, { restrauntsList: updatedList }, { merge: true });
}

