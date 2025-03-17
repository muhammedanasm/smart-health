import React, { useState } from "react";
import Button from "../../../button/Button";
import "./shiftmodal.css";

const ShiftModal = () => {
  const [shift, setShift] = useState("");

  const handleSave = () => {
    onSave(shift);
    onClose();
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
