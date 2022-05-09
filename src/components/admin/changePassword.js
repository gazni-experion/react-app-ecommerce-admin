import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
  const validateMessages = {
    required: "${label} is required!",
    range: "${label} must be between ${min} and ${max}",
    pattern:
      "Password must contain Atmost 2 special characters Min 2 uppercase characters Min 2 lowercase characters",
  };
  const [form] = Form.useForm();

  // Enable and Disable the submit button
  const [update,setUpate] = useState(true);
  return (
    <Modal
      visible={visible}
      title="Change Password"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{ disabled: update }}
    >
      <Form
        validateMessages={validateMessages}
        aria-disabled="false"
        form={form}
        layout="vertical"
        name="changePassword"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please type your current password!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your current password" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              min:6,
              max:15
            },
            {
              pattern:
                /^(?=.*[a-z].*2)(?=.*[A-Z].*2)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
              message:
                "Password must contain Atmost 2 special characters Min 2 uppercase characters Min 2 lowercase characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  setUpate(false);
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Re-enter your new password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ChangePassword = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    // setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Change Password
      </Button>
      <ChangePasswordForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ChangePassword;
