import { useEffect, useState } from "react";
import { getAllGroups } from "../../firebase/groups";

export default function PetSelector({ selectedPetIds, setSelectedPetIds, allPets }) {
    const [allGroups, setAllGroups] = useState([]);
    const [petSelectionMode, setPetSelectionMode] = useState("all");    //"all" | "group" | "specific"

    useEffect(() => {
        getAllGroups().then(setAllGroups);
    }, []);

    function sameIds(a = [], b = []) {
        return (
            a.length === b.length &&
            a.every(id => b.includes(id))
        )
    }

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
                    checked={petSelectionMode === 'all'}
                    onChange={() => {
                        setPetSelectionMode("all");
                        setSelectedPetIds(allPets.map(p => p.id));
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
                        }}
                    ></button>
                    <ul className="dropdown-menu">
                        {allGroups.map(group => {
                            const isActive = sameIds(group.petIds, selectedPetIds);

                            return (
                                <li
                                    key={group.id}
                                    className={`dropdown-item ${isActive ? "active" : ""}`}
                                    onClick={() => setSelectedPetIds(group.petIds)}
                                >
                                    {group.name}
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
                        }}
                    ></button>
                    <ul className="dropdown-menu">
                        {allPets.map(pet => {
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