export default function SelectedPetsPanel({ pets }) {
    return (
        <section>
            {pets.map((pet) => (
                <p key={pet.id}>{pet.name}</p>
            ))}
        </section>
    );
}