import React from "react";
import { Table } from "antd";

const CustomTable = ({ dataSource, columns }) => {
  return (
    <div>
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default CustomTable;
