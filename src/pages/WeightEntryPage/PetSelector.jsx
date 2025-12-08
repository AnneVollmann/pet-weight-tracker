export default function PetSelector({ selectedPets, setSelectedPets, allPets }) {
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
                        selectedPets.length === allPets.length &&
                        selectedPets.every(id => allPets.map(p => p.id).includes(id))
                    }
                    onChange={() => setSelectedPets(allPets.map(p => p.id))}
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
                    onChange={() => setSelectedPets([])}
                />
                <label className="form-check-label" htmlFor="groupedPets">
                    Eine Gruppe von Tieren
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
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
                    onChange={() => setSelectedPets([])}
                />
                <label className="form-check-label" htmlFor="specificPets">
                    Bestimmte Tiere
                </label>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"></button>
                    <ul className="dropdown-menu">
                        {allPets.map((pet) => (
                            <li onClick={() => {
                                if (selectedPets.includes(pet.id)) {
                                    setSelectedPets(selectedPets.filter(id => id !== pet.id));
                                } else {
                                    setSelectedPets([...selectedPets, pet.id]);
                                }
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