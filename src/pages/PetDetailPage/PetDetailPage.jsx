import "./PetDetailPage.css"
import { Link, useParams } from "react-router-dom";
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

    // visible weights

    const sortedWeights = [...weights].sort(
        (a, b) => a.date.toDate() - b.date.toDate()
    );
    const effectivePeriodEndDate =
        periodEndDate ??
        (sortedWeights.length > 0
            ? sortedWeights[sortedWeights.length - 1].date.toDate()
            : null);
    const weightsUntilPeriodEndDate = effectivePeriodEndDate
        ? sortedWeights.filter(w => w.date.toDate() <= effectivePeriodEndDate)
        : [];
    const numberOfVisibleWeights = sortedWeights.length <= 8 ? sortedWeights.length : 8;
    const visibleWeights = weightsUntilPeriodEndDate.slice(- numberOfVisibleWeights);

    // average weight of the period shown

    let periodAverageWeight = null;

    if (visibleWeights.length > 0) {
        const periodStartDate = visibleWeights[0].date.toDate();
        // const periodEndDate = visibleWeights[numberOfVisibleWeights - 1].date.toDate();

        const periodWeights = weights.filter(w => {
            const date = w.date.toDate();
            return date >= periodStartDate && date <= periodEndDate;
        });

        periodAverageWeight =
            periodWeights.length === 0
                ? null
                : Math.round(
                    periodWeights.reduce((sum, w) => Number(sum) + Number(w.weight), 0) /
                    periodWeights.length
                );
    }

    // warning if weight is too low

    const latestWeight = sortedWeights.length > 0 ? sortedWeights[sortedWeights.length - 1].weight : null;
    const showWarning =
        latestWeight !== null &&
        periodAverageWeight !== null &&
        latestWeight < periodAverageWeight;

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

            {showWarning && <WarningBadge petName={pet.name} ></WarningBadge>}

            <div className="pet-detail-overview">
                <div className="header">
                    <Link to="/">
                        <button type="button" className="btn-back btn" />
                    </Link>
                    <h1>{pet.name}</h1>
                </div>
                {weights.length >= 2 && <p className="pet-average-weight">Durchschnittsgewicht: {periodAverageWeight} g </p>}
                {weights.length === 0 && <p>Noch keine Einträge</p>}
            </div>

            <div className="weight-chart">
                <WeightChart
                    sortedWeights={sortedWeights}
                    visibleWeights={visibleWeights}
                    showWarning={showWarning}
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