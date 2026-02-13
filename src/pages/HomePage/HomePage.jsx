import { useAuth } from "../../context/AuthContext";
import "./HomePage.css"
import PetCard from "../../components/common/PetCard/PetCard";
import Overlay from "../../components/ui/Overlay/Overlay";
import AddWeightForm from "./AddWeightForm/AddWeightForm";
import { useEffect, useState } from "react";
import { getAllPets } from "../../firebase/pets";
import { addWeight } from "../../firebase/weights";

export default function HomePage() {
    const { authReady, user } = useAuth();
    const [pets, setPets] = useState(null);
    const [showAddWeight, setShowAddWeight] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        if (!authReady) return;

        async function fetchPets() {
            try {
                const petsData = await getAllPets();
                setPets(petsData);
            }
            catch (error) {
                setPets("error");
            }
        }
        fetchPets();
    }, [authReady]);

    if (!authReady || pets === null) {
        return <p>Lädt…</p>;
    }

    if (pets === "error") {
        return <p>Fehler beim Laden der Tiere.</p>;
    }

    if (pets.length === 0) {
        return <p>Noch keine Tiere vorhanden</p>;
    }

    function handleOpenAddWeight(pet) {
        setSelectedPet(pet);
        setShowAddWeight(true);
    }

    async function handleAddWeight(pet, weight, date) {
        await addWeight(pet.id, weight, date);
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
                title={selectedPet ? `Gewicht für ${selectedPet.name}` : "Gewicht hinzufügen"}
            >
                <AddWeightForm
                    onSubmit={(weight, date) =>
                        handleAddWeight(selectedPet, weight, date)
                    }
                    onCancel={() => setShowAddWeight(false)}
                />
            </Overlay>
        </section>
    );
}