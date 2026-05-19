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
import { animalCategories } from "../../constants/animalCategories";

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

    function getPetSpeciesLabel(species) {
        const category = animalCategories.find(category => category.id === species)
        return category.label
    }

    if (!pet) return <h1>Lade...</h1>;

    return (
        <section className="page pet-detail-page">
            <div className="pet-detail-header">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/">
                        <button type="button" className="btn-back btn" />
                    </Link>
                    <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowPetDetails(true);
                    }} type="button" className="btn-infos btn" />
                </div>

                <div className="overview">
                    <img className="pet-img" src={"/assets/img/" + pet.species + "-" + pet.name.toLowerCase() + ".png"} />
                    <div className="overview-information">
                        <h1>{pet.name}</h1>
                        <p>{getPetSpeciesLabel(pet.species)}
                            {pet.sex ? ", " + pet.sex : ""}
                        </p>
                        <p>{pet.birthday ? "geboren " + pet.birthday : ""}</p>
                    </div>
                    {/* {showWeightWarning && <WarningBadge petName={pet.name} ></WarningBadge>}
                        {weights.length >= 2 && <p className="pet-average-weight">Durchschnittsgewicht: {periodAverageWeightValue} g </p>}*/}
                </div>
            </div>

            {weights.length > 0 ?
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className="weight-chart module">
                        <WeightChart
                            sortedWeights={sortedWeights}
                            visibleWeights={visibleWeights}
                            weightWarningShown={showWeightWarning}
                            onSelectWeight={setSelectedWeight}
                        />

                        {/* <p className="selected-weight">
                    {selectedWeight === null ? (
                        "\u00A0"
                    ) : (
                        <>
                            {formatDateToString(selectedWeight.date)}:{" "}
                            {selectedWeight.weight} g
                        </>
                    )}
                </p> */}
                    </div>

                    <div className="module">
                        <WeightTable
                            groupedWeights={groupedWeights}
                            onSelectPeriodEndDate={setPeriodEndDate}
                        />
                    </div>
                </div>
                : <p className="no-entries">Noch keine Einträge</p>
            }

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