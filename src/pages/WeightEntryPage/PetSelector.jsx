export default function PetSelector({ selectedPetOption, setSelectedPetOption }) {
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
                    <p>Eine Gruppe von Tieren</p>
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        disabled={selectedPetOption !== "groupedPets"}
                    />
                </label>
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
                    <p>Bestimmte Tiere</p>
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        disabled={selectedPetOption !== "specificPets"}
                    />
                </label>
            </div>
        </div>
    );
}