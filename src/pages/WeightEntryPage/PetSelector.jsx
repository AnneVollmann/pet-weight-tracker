export default function PetSelector({ selectedPetOption, setSelectedPetOption, pets }) {
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
                    checked={selectedPetOption === "allPets"}
                    onChange={() => setSelectedPetOption("allPets")}
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
                    checked={selectedPetOption === "groupedPets"}
                    onChange={() => setSelectedPetOption("groupedPets")}
                />
                <label className="form-check-label" htmlFor="groupedPets">
                    Eine Gruppe von Tieren
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={selectedPetOption !== "groupedPets"}></button>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">Meeris Außenhaltung</li>
                        <li className="dropdown-item">Meeris Innenhaltung</li>
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
                    checked={selectedPetOption === "specificPets"}
                    onChange={() => setSelectedPetOption("specificPets")}
                />
                <label className="form-check-label" htmlFor="specificPets">
                    Bestimmte Tiere
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" disabled={selectedPetOption !== "specificPets"}></button>
                    <ul className="dropdown-menu">
                        {pets.map((pet) => (
                            <li key={pet.id} className="dropdown-item">
                                {pet.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}