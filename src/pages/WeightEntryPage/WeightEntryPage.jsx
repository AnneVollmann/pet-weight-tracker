import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import "./WeightEntryPage.css";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import SelectedPetsPanel from "./SelectedPetsPanel";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState("today");
    const [selectedPetsOption, setSelectedPetsOption] = useState("allPets");
    const [pets, setPets] = useState([]);

    useEffect(() => {
        getAllPets().then(setPets);
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
                    selectedPetsOption={selectedPetsOption}
                    setSelectedPetsOption={setSelectedPetsOption}
                    pets={pets}
                />
                <SelectedPetsPanel
                    pets={pets} 
                />
            </form>
        </section>
    );
}