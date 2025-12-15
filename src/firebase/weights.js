import { db } from "./config";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

export async function getWeightsForPet(petId) {
    const q = query(
        collection(db, "weights"),
        where("petId", "==", petId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function addWeight(petId, weight, date = new Date()) {
    console.log("Fehler beim Hinzufügen des Gewichts für", petId, ":", "xyz");
    try {
        const docRef = await addDoc(collection(db, "weights"), {
            petId,
            weight,
            date
        });
        return docRef.id;
    } catch (error) {
        console.error("Fehler beim Hinzufügen des Gewichts für", petId, ":", error);
        throw error;
    }
}