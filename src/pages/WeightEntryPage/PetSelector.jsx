import { useEffect, useState } from "react";
import { getAllGroups } from "../../firebase/groups";

export default function PetSelector({ selectedPetIds, setSelectedPetIds, allPets }) {
    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        getAllGroups().then(setAllGroups);
    }, []);

    return (
        <div>
            <h2>Tiere</h2>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="pets"
                    id="allPets"
                    value="allPets"
                    checked={
                        selectedPetIds.length === allPets.length &&
                        selectedPetIds.every(id => allPets.map(p => p.id).includes(id))
                    }
                    onChange={() => setSelectedPetIds(allPets.map(p => p.id))}
                />
                <label className="form-check-label" htmlFor="allPets">
                    Alle Tiere
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="pets"
                    id="groupedPets"
                    value="groupedPets"
                    onChange={() => setSelectedPetIds([])}
                />
                <label className="form-check-label" htmlFor="groupedPets">
                    Eine Gruppe von Tieren
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul className="dropdown-menu">
                        {allGroups.map((group) => (
                            <li onClick={() => setSelectedPetIds(group.petIds)}
                                key={group.id}
                                className="dropdown-item"
                            >
                                {group.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="pets"
                    id="specificPets"
                    value="specificPets"
                    onChange={() => setSelectedPetIds([])}
                />
                <label className="form-check-label" htmlFor="specificPets">
                    Bestimmte Tiere
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"></button>
                    <ul className="dropdown-menu">
                        {allPets.map((pet) => (
                            <li onClick={() => {
                                if (selectedPetIds.includes(pet.id)) {
                                    setSelectedPetIds(selectedPetIds.filter(id => id !== pet.id));
                                } else setSelectedPetIds([...selectedPetIds, pet.id]);
                            }}
                                key={pet.id}
                                className="dropdown-item"
                            >
                                {pet.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}