import React, { useState } from "react";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";
import { ValidatePassword } from "../../Components/validatePassword";
import { yupToFormErrors } from "./yupToFormErrors";
import "../../Styles/styles.css";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Too Short!")
    .max(15, "Too Long!")
    .required("Current password is required!"),
  newPassword: Yup.string()
    .min(6, "Password should be minimum 6 characters")
    .max(15, "Password should be less than 15 characters!")
    .matches(
      /[A-Z].*[A-Z]/,
      "Password must contain atleast 2 uppercase characters"
    )
    .matches(
      /[a-z].*[a-z]/,
      "Password must contain atleast 2 lowercase characters"
    )
    .matches(
      /[!@#$%^&()-=+{};:,<.>]/,
      "Atmost 2 special characters are allowed!"
    )
    .test(
      "atMost2SpecialCharacters",
      "Atmost 2 special characters are allowed!",
      function (value) {
        return new Promise((resolve) => {
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
          const allFoundCharacters = value.match(specialChars);
          if (allFoundCharacters && allFoundCharacters.length > 2) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
    )
    .required("Password is Required"),
  confirm: Yup.string("Confirm Password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Password is required"),
});

export const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
  // Enable and Disable the submit button
  const [formData, setFormData] = useState(null);
  const [enable, setEnable] = useState(true);

  const validateYupSchemaMultiErrors = async (values, schema) => {
    if (values && values.currentPassword) {
      setFormData({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirm: values.confirm,
      });
    }
    try {
      await validateYupSchema(values, schema);
      setEnable(false);
      return {};
    } catch (e) {
      return yupToFormErrors(e, { showMultipleFieldErrors: true });
    }
  };

  return (
    <Modal
      closable="true"
      visible={visible}
      title="Change Password"
      onCancel={onCancel}
      destroyOnClose="true"
      footer={null}
    >
      <Formik
        initialValues={{ currentPassword: "", newPassword: "", confirm: "" }}
        // onSubmit={(values) => onhandleSubmit(values)}
        onSubmit={(values) => onCreate(values)}
        validate={(values) =>
          validateYupSchemaMultiErrors(values, passwordSchema)
        }
        key="PrimaryDetails"
      >
        {({ errors, touched, values }) => (
          <Form layout="vertical" name="changePassword">
            <Form.Item name="currentPassword" label="Current Password">
              <Input.Password
                name="currentPassword"
                placeholder="Enter your current password"
              />
            </Form.Item>
            <Form.Item name="newPassword" label="New Password">
              <Input.Password
                name="newPassword"
                placeholder="Enter your new password"
              />
            </Form.Item>

            <div className="validate">
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "Password must contain atleast 2 uppercase characters",
                  touched,
                  values.newPassword
                )}
              >
                {ValidatePassword(
                  errors.newPassword,
                  "Password must contain atleast 2 uppercase characters",
                  touched,
                  values.newPassword
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                2 uppercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "Password must contain atleast 2 lowercase characters",
                  touched,
                  values.newPassword
                )}
              >
                {ValidatePassword(
                  errors.newPassword,
                  "Password must contain atleast 2 lowercase characters",
                  touched,
                  values.newPassword
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                2 lowercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "Password should be minimum 6 characters",
                  touched,
                  values.newPassword
                )}
              >
                {ValidatePassword(
                  errors.newPassword,
                  "Password should be minimum 6 characters",
                  touched,
                  values.newPassword
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Minimum 6 characters
              </span>

              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "Atmost 2 special characters are allowed!",
                  touched,
                  values.newPassword
                )}
              >
                {ValidatePassword(
                  errors.newPassword,
                  "Atmost 2 special characters are allowed!",
                  touched,
                  values.newPassword
                ) === "valid" ? (
                  <CheckCircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Almost 2 special characters
              </span>
            </div>

            <Form.Item name="confirm" label="Confirm Password">
              <Input.Password
                name="confirm"
                placeholder="Re-enter your new password"
              />
            </Form.Item>
            <span className="buttons">
              <ResetButton>Reset</ResetButton>
              <SubmitButton disabled={enable}>Submit</SubmitButton>
            </span>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
