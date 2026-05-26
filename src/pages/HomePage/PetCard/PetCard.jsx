import "./PetCard.css"
import { Link } from "react-router-dom";

export default function PetCard({ pet, onAddWeight }) {
  return (
    <div className="pet-card card">
      <Link to={`/pet/${pet.id}`} className="pet-card-link">
        <img src={"/assets/img/" + pet.species + "-" + pet.name.toLowerCase() + ".png"}
          className="card-img-top"
          alt={pet.species + "-" + pet.name.toLowerCase()} />
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddWeight(pet);
            }}
            type="button"
            className="btn btn-add" />
        </div>
      </Link>
    </div>
  );
}