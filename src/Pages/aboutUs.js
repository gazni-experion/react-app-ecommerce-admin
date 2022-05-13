import "../Styles/styles.css";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import "../Components/Config/api";
import { GetAsync, PostAsync } from "../Components/Config/api";
import { EditFilled } from "@ant-design/icons";
import { success, error } from "../Components/feedBack";

function AboutUs() {
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setIsEdit(true);
    let data = JSON.stringify({
      aboutId: 1,
      content: values.content,
    });
    console.log(data);
    PostAsync("/aboutUs/update.php", data)
      .then((res) => {
        console.log(res);
        success("Content updated successfully");
      })
      .catch((err) => {
        console.log(err);
        error("Something went wrong");
      });
  };

  useEffect(() => {
    GetAsync("/aboutUs/read.php")
      .then((res) => {
        console.log(res.data.records[0].content);
        setData(res.data.records[0].content);
        form.setFieldsValue({
          content: res.data.records[0].content,
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [form, isEdit]);
  return (
    <div className="container">
      <h2>About Us</h2>
      <EditFilled onClick={() => setIsEdit(false)} />
      <hr />
      <Form
        form={form}
        autoComplete="on"
        onFinish={onFinish}
        initialValues={data}
      >
        <Form.Item name="content" className="text-area">
          <Input.TextArea disabled={isEdit} rows={15} allowClear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" disabled={isEdit}>
              Save
            </Button>
            <Button htmlType="button" onClick={() => setIsEdit(true)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AboutUs;
