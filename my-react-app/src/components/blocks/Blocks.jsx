import React, { useState, useEffect } from "react";
import CustomTable from "../table/CustomTable";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { Select } from "antd";
import "./blocks.css";
import CustomModal from "../modal/custom-modal/CustomModal";
import Layout from "../modal/modal-layout/Layout";
import ShiftModal from "../modal/modal-content/shift-modal/ShiftModal";
import Button from "../button/Button";
import BlockModal from "../modal/modal-content/block-modal/BlockModal";

const Blocks = () => {
  const pageSize = 5;
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entryCount, setEntryCount] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [editingShift, setEditingShift] = useState(null); // Track the shift being edited

  useEffect(() => {
    const storedShifts = JSON.parse(localStorage.getItem("blocks")) || [];
    setDataSource(storedShifts);
  }, []);
  const handleSaveShift = (newShift) => {
    let updatedShifts;
    if (editingShift) {
      updatedShifts = dataSource.map((shift) =>
        shift.key === editingShift.key ? { ...shift, shift: newShift } : shift
      );
      setEditingShift(null);
    } else {
      const newShiftData = { key: Date.now().toString(), shift: newShift };
      updatedShifts = [...dataSource, newShiftData];
    }
    setDataSource(updatedShifts);
    localStorage.setItem("blocks", JSON.stringify(updatedShifts));
    setIsModalVisible(false);
  };

  const handleDeleteShift = (key) => {
    const updatedShifts = dataSource.filter((item) => item.key !== key);
    setDataSource(updatedShifts);
    localStorage.setItem("blocks", JSON.stringify(updatedShifts));
  };

  const handleEditShift = (record) => {
    setEditingShift(record);
    openModal();
  };

  const openModal = () => {
    CustomModal({
      title: <Layout label={editingShift ? "Edit Blocks" : "Add New Blocks"} />,
      content: (
        <BlockModal
          onSave={handleSaveShift}
          onClose={() => setIsModalVisible(false)}
        />
      ),
      width: "400px",
      onCancel: () => setIsModalVisible(false),
    });
  };

  const CreateNewShift = () => {
    setEditingShift(null); // Reset editing shift
    openModal();
  };

  const columns = [
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            // backgroundColor: "#D1D6E270",
            padding: "6px 10px",
            borderRadius: "6px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="text"
            shape="circle"
            icon={<EditOutlined style={{ color: "#595959" }} />}
            style={{ backgroundColor: "#D1D6E270" }}
            onClick={() => handleEditShift(record)}
          />
          <Button
            type="text"
            shape="circle"
            icon={<DeleteOutlined style={{ color: "#DF8787" }} />}
            style={{ backgroundColor: "#D1D6E270" }}
            onClick={() => handleDeleteShift(record.key)}
          />
        </div>
      ),
    },
  ];

  const handleEntryChange = (value) => {
    setEntryCount(value);
    console.log("Entries per page:", value);
  };
  return (
    <div>
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
                label={"Add New Block"}
                icon={<PlusOutlined />}
                onClick={CreateNewShift}
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
          <div className="shift-table-content">
            <CustomTable
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize, showSizeChanger: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;
