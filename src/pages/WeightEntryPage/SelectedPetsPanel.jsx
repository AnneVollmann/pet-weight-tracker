export default function SelectedPetsPanel({ selectedPets }) {
    return (
        <section>
            {selectedPets.map((pet) => (
                <p key={pet}>{pet}</p>
            ))}
        </section>
    );
}