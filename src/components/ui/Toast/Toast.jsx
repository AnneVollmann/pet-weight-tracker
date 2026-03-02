import { useEffect } from "react";
import "./Toast.css";

export default function Toast({ show, message, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="toast-container position-fixed end-0 p-3" style={{bottom: "48px"}}>
            <div className="toast show align-items-center" role="alert">
                <div className="d-flex">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button
                        type="button"
                        className="btn-close me-2 m-auto"
                        onClick={onClose}
                    ></button>
                </div>
            </div>
        </div>
    )
}