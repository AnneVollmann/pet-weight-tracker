import "./PetCard.css"
import { Link } from "react-router-dom";

export default function PetCard({ pet, onAddWeight }) {
  return (
    <div className="pet-card card" style={{ width: '16rem' }}>
      {/* <Link to={`/pet/${id}`} className="pet-card-link"> */}
        <img src={"/assets/img/pet-" + pet.img + ".png"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddWeight(pet);
            }}
            type="button"
            className="btn btn-add" />
        </div>
      {/* </Link> */}
    </div>
  );
}