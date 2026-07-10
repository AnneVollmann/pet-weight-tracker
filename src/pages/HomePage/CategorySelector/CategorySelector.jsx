import { animalCategories } from "../../../constants/animalCategories";

export default function CategorySelector({ selectedSpecies, onSelectSpecies }) {

    return (
        <nav className="nav nav-pills">
            <a
                className={`nav-link ${selectedSpecies === "all" ? "active" : ""}`}
                onClick={() => onSelectSpecies("all")}>
                Alle
            </a>
            {animalCategories.map((category) => (
                <a
                    className={`nav-link ${selectedSpecies === category.id ? "active" : ""}`}
                    key={category.id}
                    onClick={() => onSelectSpecies(category.id)}>
                    <img src={`./assets/icons/${category.id}${selectedSpecies === category.id ? "-light" : ""}.svg`} alt={category.id + "-icon"} className="animal-icon" />
                </a>
            ))}
            <a
                className={`nav-link ${selectedSpecies === "archive" ? "active" : ""}`}
                style={{marginLeft: "auto"}}
                onClick={() => onSelectSpecies("archive")}>
                Archiv
            </a>
        </nav>
    );
}