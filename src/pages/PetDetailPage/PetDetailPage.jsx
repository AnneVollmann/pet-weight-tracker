import "./PetDetailPage.css"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";
import { getWeightsForPet } from "../../firebase/weights";
import { getAverageWeightValue, getDate, getWeightWarning } from "../../lib/weights/calculations";
import { getSortedWeights, getWeightsInPeriod } from "../../lib/weights/selectors"
import WeightTable from "./components/WeightTable/WeightTable";
import WeightChart from "./components/WeightChart/WeightChart";
import WarningBadge from "./components/WarningBadge/WarningBadge";

export default function PetDetailPage() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [weights, setWeights] = useState([]);
    const [periodEndDate, setPeriodEndDate] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const p = await getPetById(id);
            setPet(p);

            const w = await getWeightsForPet(id);
            setWeights(w);
        }
        fetchData();
    }, [id]);

    const sortedWeights = getSortedWeights(weights);

    //initially sets the periodEndDate to the latestDate
    useEffect(() => {
        const latestDate = getDate(sortedWeights, "latest");
        setPeriodEndDate(latestDate);
    }, [weights]);

    const showWeightWarning = getWeightWarning(sortedWeights);

    const visibleWeights = getWeightsInPeriod(sortedWeights, {
        endDate: periodEndDate,
        limit: 8
    });

    // average weight of the period shown
    const periodAverageWeightValue = getAverageWeightValue(visibleWeights);

    // grouped weights 
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

            {showWeightWarning && <WarningBadge petName={pet.name} ></WarningBadge>}

            <div className="pet-detail-overview">
                <div className="header">
                    <Link to="/">
                        <button type="button" className="btn-back btn" />
                    </Link>
                    <h1>{pet.name}</h1>
                </div>
                {weights.length >= 2 && <p className="pet-average-weight">Durchschnittsgewicht: {periodAverageWeightValue} g </p>}
                {weights.length === 0 && <p>Noch keine Einträge</p>}
            </div>

            <div className="weight-chart">
                <WeightChart
                    sortedWeights={sortedWeights}
                    visibleWeights={visibleWeights}
                    weightWarningShown={showWeightWarning}
                    onSelectWeight={setSelectedWeight}
                />

                <p className="selected-weight">
                    {selectedWeight === null ? (
                        "\u00A0"
                    ) : (
                        <>
                            {selectedWeight.date.toDate().toLocaleDateString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}:{" "}
                            {selectedWeight.weight} g
                        </>
                    )}
                </p>
            </div>

            <WeightTable
                groupedWeights={groupedWeights}
                onSelectPeriodEndDate={setPeriodEndDate}
            />
        </section>
    );
}