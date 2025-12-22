import { useEffect, useState } from "react";
import { getPetById } from "../../firebase/pets";

export default function WeightSelector({ selectedPetIds, weights, setWeights }) {
    const [selectedPets, setSelectedPets] = useState([]);

    useEffect(() => {
        async function fetchPets() {
            const pets = await Promise.all(
                selectedPetIds.map(id => getPetById(id))
            );
            const validPets = pets.filter(pet => pet !== null);
            setSelectedPets(validPets);
        }

        if (selectedPetIds.length > 0) fetchPets();
        else setSelectedPets([]);
    }, [selectedPetIds]);

    return (
        <div className="weight-selector">
            {selectedPets.map((pet) => (
                <div key={pet.id} className="input-group mb-3">
                    <span className="pet-name input-group-text">
                        {pet.name}
                    </span>
                    <input
                        type="number"
                        pattern="\d*"
                        min="1"
                        max="999999"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        required
                        id={pet.id}
                        onChange={e =>
                            setWeights({ ...weights, [pet.id]: e.target.value })
                        }
                    />
                    <span className="input-group-text">g</span>
                </div>
            ))}
        </div>
    );
}