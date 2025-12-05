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
            <img className="logo" src="./assets/img/pet-weight-tracker-logo-guinea-pig.png" alt="logo" />
            <div className='pets-list'>
                {pets.map((pet) => (
                    <PetCard
                        key={pet.id}
                        petName={pet.name}
                        img={pet.img}
                    />
                ))}
            </div>
        </section>
    );
}