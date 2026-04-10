import { animalCategories } from "../../../constants/animalCategories";

export default function CategorySelector() {

    return (
        <ul class="nav nav-pills">
            {animalCategories.map((category) => (
                <li key={category.id} class="nav-item">
                    <a class="nav-link">{category.label}</a>
                </li>
            ))}
        </ul>
    );
}