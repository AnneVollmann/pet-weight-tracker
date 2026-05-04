import { useEffect, useState } from "react";
import { getGroupedPets } from "../../firebase/pets";

export default function PetSelector({ selectedPetIds, setSelectedPetIds, pets }) {
    const [groups, setGroups] = useState([]);
    const [petSelectionMode, setPetSelectionMode] = useState("all");    //"all" | "group" | "specific"

    useEffect(() => {
        if (!pets || pets.length === 0) return;
        setGroups(getGroupedPets(pets));
    }, [pets]);

    function sameIds(a = [], b = []) {
        return (
            a.length === b.length &&
            a.every(id => b.includes(id))
        )
    }

    return (
        <div className="pet-selector">
            <h2>Tiere</h2>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="pets"
                    id="allPets"
                    value="allPets"
                    checked={petSelectionMode === 'all'}
                    onChange={() => {
                        setPetSelectionMode("all");
                        setSelectedPetIds(pets.map(p => p.id));
                    }}
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
                    checked={petSelectionMode === 'group'}
                    onChange={() => {
                        setPetSelectionMode("group");
                        setSelectedPetIds([]);
                    }}
                />
                <label className="form-check-label" htmlFor="groupedPets">
                    Eine Gruppe von Tieren
                </label>
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => {
                            setPetSelectionMode("group");
                            setSelectedPetIds([]);
                        }}
                    ></button>
                    <ul className="dropdown-menu">
                        {groups.map(g => {
                            const isActive = sameIds(g.petIds, selectedPetIds);

                            return (
                                <li
                                    key={g.group}
                                    className={`dropdown-item ${isActive ? "active" : ""}`}
                                    onClick={() => setSelectedPetIds(g.petIds)}
                                >
                                    {g.group}
                                </li>
                            );
                        })}
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
                    checked={petSelectionMode === 'specific'}
                    onChange={() => {
                        setPetSelectionMode("specific");
                        setSelectedPetIds([]);
                    }}
                />
                <label className="form-check-label" htmlFor="specificPets">
                    Bestimmte Tiere
                </label>
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                        onClick={() => {
                            setPetSelectionMode("specific");
                            setSelectedPetIds([]);
                        }}
                    ></button>
                    <ul className="dropdown-menu">
                        {pets.map(pet => {
                            const isActive = selectedPetIds.includes(pet.id);

                            return (
                                <li onClick={() => {
                                    if (selectedPetIds.includes(pet.id)) {
                                        setSelectedPetIds(selectedPetIds.filter(id => id !== pet.id));
                                    } else setSelectedPetIds([...selectedPetIds, pet.id]);
                                }}
                                    key={pet.id}
                                    className={`dropdown-item ${isActive ? "active" : ""}`}
                                >
                                    <img src={`./../assets/icons/${pet.species}.svg`} alt={"a" + "-icon"} className="animal-icon"/>
                                    {pet.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}