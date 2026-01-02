import "./HomePage.css"
import PetCard from "../../components/common/PetCard/PetCard";
import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";

export default function HomePage() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        getAllPets().then(setPets);
    }, []);

    return (
        <section className="page">
            <div className="logo-container">
                <img className="logo" src="./assets/img/logo.png" alt="logo" />
                <div>
                    <h1>
                        <p>Pet</p>
                        <p>Weight</p>
                        <p>Tracker</p>
                    </h1>
                </div>
            </div>
            <div className='pets-list'>
                {pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        id={pet.id}
                        petName={pet.name}
                        img={pet.img}
                    />
                ))}
            </div>
        </section>
    );
}