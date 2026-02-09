import { db } from "../lib/Firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getAllGroups() {
  const snapshot = await getDocs(collection(db, "groups"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

