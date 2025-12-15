import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import "./WeightEntryPage.css";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import SelectedPetsPanel from "./SelectedPetsPanel";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState("today");
    const [allPets, setAllPets] = useState([]);
    const [selectedPetIds, setSelectedPetIds] = useState([]);

    useEffect(() => {
        getAllPets().then(setAllPets);
    }, []);

    useEffect(() => {
        if (allPets.length > 0 && selectedPetIds.length === 0) {
            setSelectedPetIds(allPets.map(p => p.id))
        }
    }, [allPets]);

    return (
        <section>
            <h1>Neue Gewichtseinträge hinzufügen</h1>
            <form>
                <DateSelector
                    selectedDateOption={selectedDateOption}
                    setSelectedDateOption={setSelectedDateOption}
                />
                <PetSelector
                    selectedPetIds={selectedPetIds}
                    setSelectedPetIds={setSelectedPetIds}
                    allPets={allPets}
                />
                <SelectedPetsPanel
                    selectedPetIds={selectedPetIds}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
}