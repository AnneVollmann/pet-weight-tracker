import "./PetDetailPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";
import { getWeightsForPet } from "../../firebase/weights";
import WeightTable from "./components/WeightTable/WeightTable";
import WeightChart from "./components/WeightChart/WeightChart";

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

    const now = new Date();
    const threeMonthAgo = new Date().setMonth(now.getMonth() - 3);
    const weightsLastThreeMonth = weights.filter(w => {
        const date = w.date.toDate();
        return date >= threeMonthAgo && date <= now;
    })
    const averageWeightLastThreeMonth =
        weightsLastThreeMonth.length === 0
            ? null
            : Math.round(
                weightsLastThreeMonth.reduce((sum, w) => Number(sum) + Number(w.weight), 0) /
                Number(weightsLastThreeMonth.length)
            );

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

            <p>Durchschnittsgewicht: {averageWeightLastThreeMonth}g </p>

            {weights.length === 0 && <p>Noch keine Einträge</p>}

            <WeightChart weights={weights} />

            <WeightTable groupedWeights={groupedWeights} />
        </section>
    );
}