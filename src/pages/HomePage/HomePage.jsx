import "./HomePage.css"
import PetCard from "../../components/common/PetCard/PetCard";
import Overlay from "../../components/ui/Overlay/Overlay";
import AddWeightForm from "./AddWeightForm/AddWeightForm";
import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";

export default function HomePage() {
    const [pets, setPets] = useState([]);
    const [showAddWeight, setShowAddWeight] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        getAllPets().then(setPets);
    }, []);

    function handleOpenAddWeight(pet) {
        setSelectedPet(pet);
        setShowAddWeight(true);
    }

    async function handleAddWeight(petData) {
        // await addPet(petData);
        setShowAddWeight(false);
    }

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
                        pet={pet}
                        onAddWeight={handleOpenAddWeight}
                    />
                ))}
            </div>

            <Overlay
                show={showAddWeight}
                onClose={() => setShowAddWeight(false)}
                title={`Gewicht für ${selectedPet.name}`}
            >
                <AddWeightForm
                    onSubmit={handleAddWeight}
                    onCancel={() => setShowAddWeight(false)}
                />
            </Overlay>
        </section>
    );
}