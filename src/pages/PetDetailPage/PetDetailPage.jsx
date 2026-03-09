import "./PetDetailPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";
import { getWeightsForPet } from "../../firebase/weights";
import WeightTable from "./components/WeightTable/WeightTable";
import WeightChart from "./components/WeightChart/WeightChart";
import WarningBadge from "./components/WarningBadge/WarningBadge";

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

    // average weight of the last three months

    const now = new Date();
    const threeMonthAgo = new Date()
    threeMonthAgo.setMonth(now.getMonth() - 3);

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

    // current weight (latest entry)

    const sortedWeights = [...weights].sort(
        (a, b) => a.date.toDate() - b.date.toDate()
    );
    const latestWeight = sortedWeights.length > 0 ? sortedWeights[sortedWeights.length - 1].weight : null;

    // warning if weight is too low

    const weightTooLow =
        latestWeight !== null &&
        averageWeightLastThreeMonth !== null &&
        latestWeight < averageWeightLastThreeMonth;

    // -------------------------  

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
        <section className="page pet-detail-page">
            {weightTooLow && <WarningBadge petName={pet.name} ></WarningBadge>}
            <div className="pet-detail-overview">
                <h1>{pet.name}</h1>
                {weights.length >= 2 && <p className="pet-average-weight">Durchschnittsgewicht: {averageWeightLastThreeMonth} g </p>}
                {weights.length === 0 && <p>Noch keine Einträge</p>}
            </div>
            <WeightChart sortedWeights={sortedWeights} weightTooLow={weightTooLow} />

            <WeightTable groupedWeights={groupedWeights} />
        </section>
    );
}