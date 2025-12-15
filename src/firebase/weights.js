import { db } from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";

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