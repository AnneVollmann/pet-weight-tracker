import { animalCategories } from "../../../constants/animalCategories";

export default function CategorySelector({ selectedSpecies, onSelectSpecies }) {

    return (
        <nav className="nav nav-pills">
            <a
                className={`nav-link ${selectedSpecies === null ? "active" : ""}`}
                onClick={() => onSelectSpecies(null)}>
                Alle Tiere
            </a>
            {animalCategories.map((category) => (
                <a
                    className={`nav-link ${selectedSpecies === category.id ? "active" : ""}`}
                    key={category.id}
                    onClick={() => onSelectSpecies(category.id)}>
                    {category.label}
                </a>
            ))}
        </nav>
    );
}