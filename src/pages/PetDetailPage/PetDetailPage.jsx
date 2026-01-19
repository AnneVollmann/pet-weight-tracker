import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";
import { getWeightsForPet } from "../../firebase/weights";

export default function PetDetailPage() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [weights, setWeights] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const p = await getPetById(id);
            setPet(p);

            const w = await getWeightsForPet(id);
            setWeights(w);
        }
        fetchData();
    }, [id]);

    if (!pet) return <h1>Lade...</h1>;

    return (
        <section className="page">
            <h1>{pet.name}</h1>

            {weights.length === 0 && <p>Noch keine Einträge</p>}

            <ul>
                {weights.map(weight => (
                    <li key={weight.id}>
                        {weight.date
                            .toDate()
                            .toLocaleDateString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        {" "}– {weight.weight}g
                    </li>
                ))}
            </ul>
        </section>
    );
}