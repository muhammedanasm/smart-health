import React, { useEffect, useState } from "react";
import { Select, Input, Table } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import RoomModal from "../modal/modal-content/room-modal/RoomModal";
import CustomModal from "../modal/custom-modal/CustomModal";
import Layout from "../modal/modal-layout/Layout";
import Button from "../button/Button";
import "./rooms.css";

const { Option } = Select;

const Room = () => {
  const [dataSource, setDataSource] = useState([]);
  const [entryCount, setEntryCount] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    setDataSource(storedRooms);
  }, []);

  const handleSaveRoom = (newRoom) => {
    let updatedRooms;

    if (newRoom?.key) {
      // Editing
      updatedRooms = dataSource.map((room) =>
        room.key === newRoom.key
          ? { ...room, roomName: newRoom.roomName, block: newRoom.block }
          : room
      );
      setEditingRoom(null); // Reset editing state
    } else {
      // New room
      const newRoomData = { key: Date.now().toString(), ...newRoom };
      updatedRooms = [...dataSource, newRoomData];
    }

    setDataSource(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };

  const handleDeleteRoom = (key) => {
    const updatedRooms = dataSource.filter((room) => room.key !== key);
    setDataSource(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };

  const handleEditRoom = (record) => {
    console.log("records", record);
    setEditingRoom(record);
    openModal(record);
  };

  const openModal = (roomToEdit = null) => {
    setEditingRoom(roomToEdit); // ✅ Set it here
    CustomModal({
      title: <Layout label={roomToEdit ? "Edit Room" : "Add New Room"} />,
      content: (
        <RoomModal
          editingRoom={roomToEdit}
          onSave={handleSaveRoom}
          onClose={() => setEditingRoom(null)}
          editingShift={roomToEdit}
        />
      ),
      width: "500px",
      onCancel: () => setEditingRoom(null),
    });
  };

  const handleCreateNewRoom = () => {
    setEditingRoom(null);
    openModal(null);
  };

  const handleEntryChange = (value) => {
    setEntryCount(value);
  };

  const filteredData = dataSource.filter((item) =>
    item.roomName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditRoom(record)}
            customStyles={{
              borderRadius: "30px",
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteRoom(record.key)}
            customStyles={{
              borderRadius: "30px",
              color: "red",
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="shift-table-wrapper">
        <div className="shift-table-header">
          <div className="show">
            <p>Show</p>
            <Select
              defaultValue={10}
              style={{ width: 100 }}
              onChange={handleEntryChange}
            >
              <Option value={10}>10</Option>
              <Option value={25}>25</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
            <p>entries</p>
          </div>
          <div className="head-create">
            <input
              className="inp-field"
              type="text"
              name=""
              id=""
              placeholder="Search"
            />

            <Button
              label={"Add New Room"}
              icon={<PlusOutlined />}
              onClick={handleCreateNewRoom}
              customStyles={{
                background: "#9575DE",
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
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData.slice(0, entryCount)}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default Room;
