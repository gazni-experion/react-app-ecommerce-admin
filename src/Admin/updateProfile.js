import React, { useEffect } from "react";
import { Form, Input, message, Button, Space, Card, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../Styles/styles.css";
import { PostWithAuthTokenAsync } from "../Components/Config/api";
import store from "../Store/store";
import { GetAdminDetails } from "../Store/Actions/authAction";
import { UploadImage } from "../Components/uploadImage";

function UpdateProfile() {
  // Call redux hook
  GetAdminDetails();

  let navigate = useNavigate();
  const [form] = Form.useForm();
  let profileDetails = store.getState().auth.auth.data; // Setting the profile details from the redux store

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(profileDetails);
      form.setFieldsValue({
        // Setting the profile details from the redux store in the update form
        userId: profileDetails.userId,
        userName: profileDetails.userName,
        email: profileDetails.email,
        phoneNumber: profileDetails.phoneNumber,
        gender: profileDetails.gender,
      });
    } else {
      navigate("/");
    }
  }, [form, profileDetails, navigate]);

  const onFinish = (values) => {
    let data = JSON.stringify(values);
    console.log(data);
    PostWithAuthTokenAsync("/users/update.php", data) // Updating the profile details
      .then((res) => {
        console.log(res);
        if (res.status) {
          alert("Profile update succefully");
          navigate("/admin/profile"); // Navigating to the profile page
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong please try again!");
      });
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
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
      <LeftOutlined onClick={() => navigate("/admin/profile")} />
      <Card title="Profile">
        <h3>User Id: {profileDetails.userId}</h3>
        <Form
          validateMessages={validateMessages}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="userId" name="userId" hidden="true">
            <Input />
          </Form.Item>
          <Form.Item label="Profile Picture" name="pic">
            <UploadImage
              getUrl="/userImages/read_one.php?id="
              postUrl="/userImages/update.php"
              id={profileDetails.userId}
            />
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
                required: true,
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter Email" />
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
            <Select placeholder="Select Gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateProfile;
