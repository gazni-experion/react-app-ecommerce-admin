import React, { useEffect} from "react";
import { Form, Input, message, Button, Space, Card, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/styles.css";



function AddUser( ) {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();

  console.log(location.state.name);
  console.log(location.state.userId);

  useEffect(() => {
    fetch(`http://localhost/RESTAPI/ecommerce/api/users/read_one.php?id=${location.state.userId}`)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            form.setFieldsValue({
              userId:result.userId,
              userName:result.userName,
              email:result.email,
              passwords: result.passwords,
              phoneNumber: result.phoneNumber,
              gender:result.gender
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        );
  }, [form, location.state.userId]);


  const onFinish = (values) => {
    console.log(values.userId);
    if(values.userId){
      fetch("http://localhost/RESTAPI/ecommerce/api/users/update.php",{body:JSON.stringify(values), method:"POST"})
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(JSON.stringify(values));
          if (result.message === "User updated successfully") {
              console.log(result);
              message.success(result.message);
              navigate("/admin/users");
          }
          else{
              message.error(result.message);
          }
      },
      (error) => {
          console.log(error);
          message.error(error.message);
        },
      );
    }
    else{
    fetch("http://localhost/RESTAPI/ecommerce/api/users/create.php",{body:JSON.stringify(values), method:"POST"})
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        console.log(JSON.stringify(values));
          if (result.message === "User added successfully!") {
              console.log(result);
              message.success(result.message);
              form.resetFields();
          }
          else{
              message.error(result.message);
          }
      },
      (error) => {
          console.log(error);
          message.error(error.message);
        },
      );
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onReset = () => {
    form.resetFields();
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div className="editForm">
      <LeftOutlined onClick={() => navigate("/admin/users")} />
      <Card title={location.state.name}>
        <Form
          validateMessages={validateMessages}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="userId" name="userId" hidden={true} >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="userName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item
          hidden={true}
            name="passwords"
            label="Password"
            rules={[
              {
                required: true,
                min: 5,
                max: 30,
              },
            ]}
          >
            <Input placeholder="Enter Password" type="password" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                min: 10,
                max: 12,
              },
            ]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Gender" allowClear>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
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
    </div>
  );
}

export default AddUser;
