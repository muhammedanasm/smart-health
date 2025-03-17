import React, { useState, useEffect } from "react";
import CustomTable from "../table/CustomTable";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { Select } from "antd";
import "./shiftedtable.css";
import CustomModal from "../modal/custom-modal/CustomModal";
import Layout from "../modal/modal-layout/Layout";
import ShiftModal from "../modal/modal-content/shift-modal/ShiftModal";
import Button from "../button/Button";

const ShiftTable = () => {
  const pageSize = 5;
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entryCount, setEntryCount] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [editingShift, setEditingShift] = useState(null); // Track the shift being edited

  useEffect(() => {
    const storedShifts = JSON.parse(localStorage.getItem("shifts")) || [];
    setDataSource(storedShifts);
  }, []);

  const handleSaveShift = (newShift) => {
    const newShiftData = { key: Date.now().toString(), shift: newShift };
    const updatedShifts = [...dataSource, newShiftData];
    setDataSource(updatedShifts);
    localStorage.setItem("shifts", JSON.stringify(updatedShifts));
  };

  const handleDeleteShift = (key) => {
    const updatedShifts = dataSource.filter((item) => item.key !== key);
    setDataSource(updatedShifts);
    localStorage.setItem("shifts", JSON.stringify(updatedShifts));
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

  const CreateNewShift = () => {
    CustomModal({
      title: <Layout label="Add New Shift" />,
      content: <ShiftModal />,
      width: "400px",
    });
  };

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
          <div>
            <input type="text" name="" id="" placeholder="Search" />

            <Button
              label={"Add New Shift"}
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
  );
};

export default ShiftTable;
