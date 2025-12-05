import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

export async function getAllPets() {
  const snapshot = await getDocs(collection(db, "pets"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}