import React, { useState } from "react";
import { Form, Input } from "formik-antd";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";
import { ValidatePassword } from "../../Components/validatePassword";
import { yupToFormErrors } from "./yupToFormErrors";
import "../../Styles/styles.css";

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Too Short!")
    .max(15, "Too Long!")
    .required("Current password is required!"),
  newPassword: Yup.string()
    .min(6, "minimum")
    .max(15, "Password should be less than 15 characters!")
    .matches(/[A-Z].*[A-Z]/, "2_uppercase")
    .matches(/[a-z].*[a-z]/, "2_lowercase")
    // .matches(/[!@#$%^&()-=+{};:,<.>].{0,2}/, "Atmost 2 special characters")
    // .test(
    //   "atMost2SpecialCharacters",
    //   "Atmost 2 special characters are allowed!",
    //   function (value) {
    //     return new Promise((resolve) => {
    //       const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
    //       const allFoundCharacters = value.match(specialChars);
    //       if (allFoundCharacters.length > 2) {
    //         resolve(false);
    //       } else {
    //         resolve(true);
    //       }
    //     });
    //   }
    // )
    .required("Password is Required"),
  confirm: Yup.string("Confirm Password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Password is required"),
});

export const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
  // Enable and Disable the submit button
  const [formData, setFormData] = useState(null);

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
      return {};
    } catch (e) {
      return yupToFormErrors(e, { showMultipleFieldErrors: true });
    }
  };

  return (
    <Modal visible={visible} title="Change Password" closable="true">
      <Formik
        initialValues={{ currentPassword: "", newPassword: "", confirm: "" }}
        // onSubmit={(values, props) => onhandleSubmit(values, props)}
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
                  "2_uppercase",
                  touched,
                  values.newPassword
                )}
              >
                2 uppercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "2_lowercase",
                  touched,
                  values.newPassword
                )}
              >
                2 lowercase characters
              </span>
              <span
                className={ValidatePassword(
                  errors.newPassword,
                  "minimum",
                  touched,
                  values.newPassword
                )}
              >
                Minimum 6 characters
              </span>

              {/* <span className={ValidatePassword(...props)}>
                    Almost 2 special characters
                  </span> */}
            </div>

            {/* <ErrorMessage name="newPassword" /> */}
            <Form.Item name="confirm" label="Confirm Password">
              <Input.Password
                name="confirm"
                placeholder="Re-enter your new password"
              />
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
