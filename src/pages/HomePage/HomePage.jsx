import "./HomePage.css"
import PetCard from "../../components/common/PetCard/PetCard";

export default function HomePage() {
    return (
        <section className="page">
            <img className="logo" src="./assets/img/pet-weight-tracker-logo-guinea-pig.png" alt="logo"/>
            <div className='pets-list'>
                <PetCard petName="Pauli" img="1" />
                <PetCard petName="Frieda" img="3" />
                <PetCard petName="Elli" img="2" />
            </div>
        </section>
    );
}