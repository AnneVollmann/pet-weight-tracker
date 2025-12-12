import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";

export default function PetDetailPage() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        async function fetchPet() {
            const p = await getPetById(id);
            setPet(p);
        }
        fetchPet();
    }, [id]);

    if (!pet) return <h1>Lade...</h1>;

    return (
        <section>
            <h1>{pet.name}</h1>
        </section>
    );
}