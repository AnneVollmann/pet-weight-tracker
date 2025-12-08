import { db } from "./config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export async function getAllGroups() {
  const snapshot = await getDocs(collection(db, "groups"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPetsInGroup(groupId) {
  const groupRef = doc(db, "groups", groupId);
  const groupSnap = await getDoc(groupRef);
  return groupSnap.data().petIds || [];
}