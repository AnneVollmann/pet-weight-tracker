import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import "./WeightEntryPage.css";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import WeightSelector from "./WeightSelector";
import { addWeight } from "../../firebase/weights";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState(new Date());
    const [allPets, setAllPets] = useState([]);
    const [selectedPetIds, setSelectedPetIds] = useState([]);
    const [weights, setWeights] = useState({});   // { petId: weight }

    useEffect(() => {
        getAllPets().then(setAllPets);
    }, []);

    useEffect(() => {
        if (allPets.length > 0 && selectedPetIds.length === 0) setSelectedPetIds(allPets.map(p => p.id))
    }, [allPets]);

    function handleSubmit(e) {
        e.preventDefault();
          for (const petId of selectedPetIds) addWeight(petId, weights[petId], selectedDateOption)
        setSelectedPetIds([]);
        setWeights({});
    }

    return (
        <section>
            <h1>Neue Gewichtseinträge hinzufügen</h1>
            <form onSubmit={handleSubmit}>
                <DateSelector
                    setSelectedDateOption={setSelectedDateOption}
                />
                <PetSelector
                    selectedPetIds={selectedPetIds}
                    setSelectedPetIds={setSelectedPetIds}
                    allPets={allPets}
                />
                <WeightSelector
                    selectedPetIds={selectedPetIds}
                    weights={weights}
                    setWeights={setWeights}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
}