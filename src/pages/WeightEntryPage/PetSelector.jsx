export default function PetSelector({ selectedPetsOption, setSelectedPetsOption, pets }) {
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
                    checked={selectedPetsOption === "allPets"}
                    onChange={() => setSelectedPetsOption("allPets")}
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
                    checked={selectedPetsOption === "groupedPets"}
                    onChange={() => setSelectedPetsOption("groupedPets")}
                />
                <label className="form-check-label" htmlFor="groupedPets">
                    Eine Gruppe von Tieren
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={selectedPetsOption !== "groupedPets"}></button>
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
                    checked={selectedPetsOption === "specificPets"}
                    onChange={() => setSelectedPetsOption("specificPets")}
                />
                <label className="form-check-label" htmlFor="specificPets">
                    Bestimmte Tiere
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" disabled={selectedPetsOption !== "specificPets"}></button>
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