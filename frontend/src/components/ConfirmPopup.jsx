import "../stylesheets/ConfirmPopup.css"
const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <p>{message || "Are you sure you want to delete this account?"}</p>
                <div className="popup-actions">
                    <button className="confirm-btn" onClick={onConfirm}>Yes</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
