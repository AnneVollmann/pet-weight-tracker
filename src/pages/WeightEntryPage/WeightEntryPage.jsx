import { useEffect, useState } from "react";
import "./WeightEntryPage.css";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import WeightSelector from "./WeightSelector";
import { addWeight } from "../../firebase/weights";
import { updatePetTimestamp } from "../../firebase/pets";
import Toast from "../../components/ui/Toast/Toast";
import { usePets } from "../../context/PetsContext";

export default function WeightEntryPage() {
    const { pets, loading, error, refreshPets } = usePets();
    const [selectedDateOption, setSelectedDateOption] = useState(new Date());
    const [selectedPetIds, setSelectedPetIds] = useState([]);
    const [weights, setWeights] = useState({});   // { petId: weight }
    const [showToastAddWeights, setShowToastAddWeights] = useState(false);

    useEffect(() => {
        if (pets.length > 0 && selectedPetIds.length === 0) setSelectedPetIds(pets.map(p => p.id))
    }, [pets]);

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
                        pets={pets.filter((pet) => pet.archived !== true)}
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