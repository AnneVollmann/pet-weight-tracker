import { animalCategories } from "../../../constants/animalCategories";

export default function CategorySelector() {

    return (
        <ul className="nav nav-pills">
            {animalCategories.map((category) => (
                <li key={category.id} className="nav-item">
                    <a className="nav-link">{category.label}</a>
                </li>
            ))}
        </ul>
    );
}