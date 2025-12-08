import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";
import "./WeightEntryPage.css";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState("today");
    const [selectedPetOption, setSelectedPetOption] = useState("allPets");
    const [pets, setPets] = useState([]);

    useEffect(() => {
        getAllPets().then(setPets);
    }, []);

    return (
        <section>
            <h1>WeightEntryPage</h1>
            <form>
                <DateSelector
                    selectedDateOption={selectedDateOption}
                    setSelectedDateOption={setSelectedDateOption}
                />
                <PetSelector
                    selectedPetOption={selectedPetOption}
                    setSelectedPetOption={setSelectedPetOption}
                    pets={pets}
                />
            </form>
        </section>
    );
}