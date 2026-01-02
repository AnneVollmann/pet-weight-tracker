import "./PetCard.css"
import { Link } from "react-router-dom";

export default function PetCard({ id, petName, img }) {
  return (
    <div className="pet-card card" style={{ width: '16rem' }}>
      <Link to={`/pet/${id}`} className="pet-card-link">
        <img src={"/assets/img/pet-" + img + ".png"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{petName}</h5>
          <button type="button" className="btn btn-add"/>
        </div>
      </Link>
    </div>
  );
}