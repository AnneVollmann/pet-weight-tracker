import "./WarningBadge.css"

export default function WarningBadge({ petName }) {
    return (
        <div className="warning-badge">
            <p>Achtung: Das Gewicht von {petName} liegt unter dem Durchschnitt der letzten 3 Monate.</p>
        </div>
    );
}