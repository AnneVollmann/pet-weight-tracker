
import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";

export default function SelectedPetsPanel({ selectedPetIds }) {
    const [selectedPets, setSelectedPets] = useState([]);

    useEffect(() => {
        async function fetchPets() {
            const pets = await Promise.all(
                selectedPetIds.map(id => getPetById(id))
            );
            setSelectedPets(pets.filter(pet => pet !== null));
        }

        if (selectedPetIds.length > 0) {
            fetchPets();
        } else {
            setSelectedPets([]);
        }
    }, [selectedPetIds]);

    return (
        <section>
            {selectedPets.map((pet) => (
                <div key={pet.id} className="input-group mb-3">
                    <span className="input-group-text">
                        {pet.name}
                    </span>
                    <input type="number" inputMode="numeric" pattern="\d*" min="1" max="999999" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    <span className="input-group-text">
                        g
                    </span>
                </div>
            ))}
        </section>
    );
}