import React, { useState, useEffect } from "react";
import Button from "../../../button/Button";
import "./shiftmodal.css";
import Swal from "sweetalert2";

const ShiftModal = ({ onSave, onClose, editingShift }) => {
  const [shift, setShift] = useState("");

  // Pre-fill the input field if editingShift is provided
  useEffect(() => {
    if (editingShift) {
      setShift(editingShift.shift || "");
    }
  }, [editingShift]);

  const handleSave = () => {
    // Validate if the input field is empty
    if (!shift.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Shift field cannot be empty!",
      });
      return; // Stop further execution
    }
    // If editing, send key + updated shift
    if (editingShift) {
      onSave({ key: editingShift.key, shift });
    } else {
      onSave(shift); // For new shift, just pass shift text
    }

    // onSave(shift);
    Swal.close();
    onClose();
  };
  const handleClose = () => {
    Swal.close(); // Close the SweetAlert modal
    onClose(); // Call the onClose prop if needed
  };

  return (
    <div>
      <div className="shift-parent">
        <div className="new-sift">
          <label htmlFor="">Shift</label>
          <input
            type="text"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          />
        </div>
        <div className="shifted-btns">
          <Button
            label={"Close"}
            onClick={handleClose}
            customStyles={{
              background: "#6D7781",
              color: "#fff",
              fontSize: "16px",
              borderRadius: "4px",
              fontWeight: "400",
              padding: "8px 20px",
              fontFamily: "Poppins",
              border: "none",
              boxShadow: "none",
            }}
          />
          <Button
            label={"Save Shift"}
            onClick={handleSave}
            customStyles={{
              background: "#9575DE",
              color: "#fff",
              fontSize: "16px",
              borderRadius: "4px",
              fontWeight: "400",
              padding: "8px 25px",
              fontFamily: "Poppins",
              border: "none",
              boxShadow: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftModal;
