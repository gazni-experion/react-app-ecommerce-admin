import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Form, Typography, message } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Users() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost/RESTAPI/ecommerce/api/users/read.php")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result.records);
          console.log(result.records);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }, [refresh]);

  // Search filter
  const search = (value) => {
    if (value === "") {
      setRefresh(refresh + 1);
    } else {
      fetch(
        `http://localhost/RESTAPI/ecommerce/api/users/search.php?s=${value}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setData(result.records);
            // console.log(result.records);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const deleteUser = (record) => {
    console.log(record);
    fetch("http://localhost/RESTAPI/ecommerce/api/users/delete.php", {
      body: JSON.stringify({ id: record.userId }),
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "User deleted successfully!") {
            console.log(result);
            message.success(result.message);
            setRefresh(refresh + 1);
            console.log(refresh);
          } else {
            message.error(result.message);
          }
        },
        (error) => {
          console.log(error);
          message.error(error.message);
        }
      );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      width: "5%",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "40%",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: "40%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "15%",
    },
    {
      title: "Operation",
      dataIndex: "userId",
      width: "10%",
      render: (_, record) => {
        return (
          <span>
            <Typography.Link
              onClick={() =>
                navigate("/admin/add-user", {
                  state: { name: "Update User", userId: record.userId },
                })
              }
            >
              <EditTwoTone />
            </Typography.Link>
            <Typography.Link id={record.userId}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteUser(record)}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </Popconfirm>
            </Typography.Link>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => col);

  return (
    <div className="container">
      <h2>Users</h2>
      <hr />
      <Button type="primary" onClick={() => navigate("/admin/add-user", {
                  state: { name: "Add User", userId: "" },
                })}>
        Add User
      </Button>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search users..."
        onChange={(e) => {
          search(e.target.value);
        }}
      />
      <Form form={form} component={false}>
        <Table
          rowKey={(record) => record.userId}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            defaultPageSize: 5,
          }}
        />
      </Form>
    </div>
  );
}
export default Users;
