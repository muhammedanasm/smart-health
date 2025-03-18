import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const RoomModal = ({ editingRoom, onSave, onClose }) => {
  const [roomName, setRoomName] = useState("");
  const [block, setBlock] = useState("");

  useEffect(() => {
    if (editingRoom) {
      setRoomName(editingRoom.roomName || "");
      setBlock(editingRoom.block || "");
    }
  }, [editingRoom]);

  const handleSave = () => {
    if (!roomName.trim() || !block.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Both Room Name and Block must be filled!",
      });
      return;
    }

    // If editing, send key + updated room data
    if (editingRoom) {
      onSave({ key: editingRoom.key, roomName, block });
    } else {
      // For new room, send roomName and block
      onSave({ roomName, block });
    }

    Swal.close();
    onClose();
  };

  const handleClose = () => {
    Swal.close();
    onClose();
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            fontSize: "14px",
            fontWeight: "500",
            display: "block",
            marginBottom: "6px",
            textAlign: "left",
          }}
        >
          Room Name
        </label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            fontFamily: "Poppins",
          }}
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label
          style={{
            fontSize: "14px",
            fontWeight: "500",
            display: "block",
            marginBottom: "6px",
            textAlign: "left",
          }}
        >
          Block
        </label>
        <select
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            fontFamily: "Poppins",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Select an option</option>
          <option value="Block 1">Block 1</option>
          <option value="Block 2">Block 2</option>
          <option value="Block 3">Block 3</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <button
          onClick={handleClose}
          style={{
            background: "#6D7781",
            color: "#fff",
            padding: "10px 25px",
            borderRadius: "6px",
            border: "none",
            fontFamily: "Poppins",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
        <button
          onClick={handleSave}
          style={{
            background: "#9575DE",
            color: "#fff",
            padding: "10px 25px",
            borderRadius: "6px",
            border: "none",
            fontFamily: "Poppins",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          {editingRoom ? "Update Room" : "Save Room"}
        </button>
      </div>
    </div>
  );
};

export default RoomModal;
