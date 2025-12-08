import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import "./WeightEntryPage.css";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import SelectedPetsPanel from "./SelectedPetsPanel";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState("today");
    const [allPets, setAllPets] = useState([]);
    const [selectedPets, setSelectedPets] = useState(allPets.map(p => p.id));

    useEffect(() => {
        getAllPets().then(setAllPets);
    }, []);

    return (
        <section>
            <h1>Neue Gewichtseinträge hinzufügen</h1>
            <form>
                <DateSelector
                    selectedDateOption={selectedDateOption}
                    setSelectedDateOption={setSelectedDateOption}
                />
                <PetSelector
                    selectedPets={selectedPets}
                    setSelectedPets={setSelectedPets}
                    allPets={allPets}
                />
                <SelectedPetsPanel
                    selectedPets={selectedPets} 
                />
            </form>
        </section>
    );
}