import React from "react";
import { Form, Input, message, Button, Space, Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {  PostAsync } from "../Utils/Config/api";
import { success, error } from "../Components/feedBack";

function AddCategory() {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    PostAsync("/categories/create.php",JSON.stringify(values))
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "Category was created.") {
            console.log(result);
            success(result.message);
            form.resetFields();
          } else {
            error(result.message);
          }
        },
        (error) => {
          console.log(error);
          message.error(error.message);
        }
      );
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <LeftOutlined
        style={{ color: "purple", fontSize: 30 }}
        onClick={() => navigate("/admin/categories")}
      />
      <Card
        title=" Add Category"
        style={{ width: "50%", margin: "auto", gap: 10 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
              },
              {
                type: "string",
                min: 3,
              },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default AddCategory;
