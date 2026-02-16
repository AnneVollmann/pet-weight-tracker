export default function WarningBadge({ petName }) {
    return (
        <div className="warning-badge">
            <p>Das Gewicht von {petName} liegt unter dem Durchschnitt.</p>
        </div>
    );
}