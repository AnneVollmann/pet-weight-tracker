import { useParams } from "react-router-dom";

export default function PetDetailPage() {
    const { id } = useParams();

    return (
        <div>Pet Detail for ID: {id}</div>
    );
}