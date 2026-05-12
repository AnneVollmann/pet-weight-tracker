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
import BasicModal from "../../components/ui/BasicModal/BasicModal";
import PetDetails from "./components/PetDetails/PetDetails";
import { formatDateToString } from "../../lib/dates/formatDate";

export default function PetDetailPage() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [weights, setWeights] = useState([]);
    const [periodEndDate, setPeriodEndDate] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [showPetDetails, setShowPetDetails] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const p = await getPetById(id);
            setPet(p);

            const w = await getWeightsForPet(id);
            setWeights(w);
        }
        fetchData();
    }, [id, weights]);

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

            <div className="pet-detail-overview">
                <header>
                    <Link to="/">
                        <button type="button" className="btn-back btn" />
                    </Link>
                    <h1>{pet.name}</h1>
                    <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowPetDetails(true);
                    }} type="button" className="btn-infos btn"/>
                </header>
                {showWeightWarning && <WarningBadge petName={pet.name} ></WarningBadge>}
                {weights.length >= 2 && <p className="pet-average-weight">Durchschnittsgewicht: {periodAverageWeightValue} g </p>}
                {weights.length === 0 && <p className="no-entries">Noch keine Einträge</p>}
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
                            {formatDateToString(selectedWeight.date)}:{" "}
                            {selectedWeight.weight} g
                        </>
                    )}
                </p>
            </div>

            <WeightTable
                groupedWeights={groupedWeights}
                onSelectPeriodEndDate={setPeriodEndDate}
            />

            <BasicModal
                show={showPetDetails}
                onHide={() => setShowPetDetails(false)}
                pet={pet.name}
            >
                <PetDetails
                pet={pet}
                onUpdatePet={setPet}>
                </PetDetails>
            </BasicModal>
        </section>
    );
}