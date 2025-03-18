import React, { useState } from "react";
import Button from "../../../button/Button";
import Swal from "sweetalert2";

const RoomSheduleModal = ({ onSave, onClose, doctorsList = [] }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleSave = () => {
    if (!selectedDoctor) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a doctor before saving!",
      });
      return;
    }

    onSave(selectedDoctor);
    Swal.close();
    onClose();
  };

  const handleClose = () => {
    Swal.close();
    onClose();
  };

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <label htmlFor="doctor-select">Select doctor</label>
        <select
          id="doctor-select"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="modal-select"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid rgb(204, 204, 204)",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            backgroundColor: "#fff",
            width: "100%",
            outline: "none",
            color: "#333",
            marginTop: "8px",
          }}
        >
          <option value="">Select doctor</option>
          {doctorsList.map((doc, index) => (
            <option key={index} value={doc}>
              {doc}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "30px",
        }}
      >
        <Button
          label="Close"
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
          label="Save Room"
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
  );
};

export default RoomSheduleModal;
