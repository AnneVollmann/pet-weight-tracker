import { useState } from "react";
import DateSelector from "./DateSelector";
import PetSelector from "./PetSelector";

export default function WeightEntryPage() {
    const [selectedDateOption, setSelectedDateOption] = useState("today");
    const [selectedPetOption, setSelectedPetOption] = useState("allPets");

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
                />
            </form>
        </section>
    );
}