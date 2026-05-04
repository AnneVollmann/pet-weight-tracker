import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import "./WeightEntryPage.css";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import WeightSelector from "./WeightSelector";
import { addWeight } from "../../firebase/weights";
import { updatePetTimestamp } from "../../firebase/pets";
import Toast from "../../components/ui/Toast/Toast";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState(new Date());
    const [allPets, setAllPets] = useState([]);
    const [selectedPetIds, setSelectedPetIds] = useState([]);
    const [weights, setWeights] = useState({});   // { petId: weight }
    const [showToastAddWeights, setShowToastAddWeights] = useState(false);

    useEffect(() => {
        getAllPets().then(setAllPets);
    }, []);

    useEffect(() => {
        if (allPets.length > 0 && selectedPetIds.length === 0) setSelectedPetIds(allPets.map(p => p.id))
    }, [allPets]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            for (const petId of selectedPetIds) await addWeight(petId, weights[petId], selectedDateOption);
            for (const petId of selectedPetIds) await updatePetTimestamp(petId);
            setSelectedPetIds([]);
            setWeights({});
            setShowToastAddWeights(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="page">
            <div className="content">
                <h1>Neue Gewichtseinträge hinzufügen</h1>
                <form onSubmit={handleSubmit}>
                    <DateSelector
                        setSelectedDateOption={setSelectedDateOption}
                    />
                    <PetSelector
                        selectedPetIds={selectedPetIds}
                        setSelectedPetIds={setSelectedPetIds}
                        pets={allPets}
                    />
                    <WeightSelector
                        selectedPetIds={selectedPetIds}
                        weights={weights}
                        setWeights={setWeights}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Toast
                    show={showToastAddWeights}
                    message={"Gewichtseinträge erfolgreich hinzugefügt!"}
                    onClose={() => setShowToastAddWeights(false)}
                />
            </div>
        </section>
    );
}