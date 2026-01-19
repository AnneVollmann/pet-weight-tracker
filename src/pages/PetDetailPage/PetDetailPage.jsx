import "./PetDetailPage.css"
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

    const groupedWeights = weights.reduce((acc, weight) => {
        const date = weight.date.toDate();
        const year = date.getFullYear();
        const month = date.getMonth();
        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = [];
        acc[year][month].push(weight);
        return acc;
    }, {});

    if (!pet) return <h1>Lade...</h1>;

    return (
        <section className="page">
            <h1>{pet.name}</h1>

            {weights.length === 0 && <p>Noch keine Einträge</p>}

            <ul className="pet-weights-overview">
                {Object.entries(groupedWeights)
                    .sort(([a], [b]) => b - a)
                    .map(([year, months]) => (
                        <div key={year}>
                            <h2>{year}</h2>

                            {Object.entries(months)
                                .sort(([a], [b]) => b - a)
                                .map(([month, monthWeights]) => (
                                    <div key={month}>
                                        <h3>
                                            {new Date(year, month).toLocaleDateString("de-DE", {
                                                month: "long",
                                            })}
                                        </h3>

                                        <ul className="pet-weights-month">
                                            {monthWeights.map(weight => (
                                                <li key={weight.id}>
                                                    <span className="pet-date">
                                                        {weight.date.toDate().toLocaleDateString("de-DE", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                    <span className="pet-weight">
                                                        {weight.weight} g
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                    ))}
            </ul>
        </section>
    );
}