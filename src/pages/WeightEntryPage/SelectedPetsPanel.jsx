
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
                <p key={pet.id}>{pet.name}</p>
            ))}
        </section>
    );
}