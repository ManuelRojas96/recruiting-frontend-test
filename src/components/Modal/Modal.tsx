import React from "react";
import "./Modal.css"; // Asegúrate de tener el archivo CSS

const Modal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-icon">✔️</span>
                </div>
                <div className="modal-body">
                    <p>Nota de crédito asignada correctamente</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={onClose}>
                        Seguir asignando
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
