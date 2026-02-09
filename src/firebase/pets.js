import { db } from "../lib/Firebase";
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

export async function getAllPets() {
  const snapshot = await getDocs(collection(db, "pets"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPetById(petId) {
  const petRef = doc(db, "pets", petId);
  const petSnap = await getDoc(petRef);

  if (petSnap.exists()) {
    return { id: petSnap.id, ...petSnap.data() };
  } else {
    return null;
  }
}

export async function addPet(img, name) {
    try {
        const docRef = await addDoc(collection(db, "pets"), {
          img,
          name
        });
        return docRef.id;
    } catch (error) {
        console.error("Fehler beim Hinzufügen von", name);
        throw error;
    }
}