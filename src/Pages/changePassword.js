import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Modal, Form, Input, message } from "antd";
import { PostWithAuthTokenAsync } from "../Utils/Config/api";

// Yup and formik validation in change password form
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Too Short!")
    .max(15, "Too Long!")
    .required("Current password is required!"),
  newPassword: Yup.string()
    .min(6, "Password must be minimum 6 characters!")
    .max(15, "Password should be less than 15 characters!")
    .matches(/[A-Z].*[A-Z]/, "Password must contain two uppercase characters")
    .matches(/[a-z].*[a-z]/, "Password must contain 2 lowercase characters")
    .matches(/[!@#$%^&()-=+{};:,<.>].{0,2}/, "Atmost 2 special characters")
    .required("Password is Required"),
  confirmPassword: Yup.string("Confirm Password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Password is required"),
});

const changePassword = () => {
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validateOnChange={true}
      validationSchema={passwordSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="currentPassword">Current Password</label>
        <Field name="currentPassword" type="text" />
        <ErrorMessage name="currentPassword" />

        <label htmlFor="newPassword">New Password</label>
        <Field name="newPassword" type="text" />
        <ErrorMessage name="newPassword" />

        <label htmlFor="confirmPassword">Confirm Passwprd</label>
        <Field name="confirmPassword" type="text" />
        <ErrorMessage name="confirmPassword" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default changePassword;

// Ant d form validation in change password form

// const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
//   const validateMessages = {
//     required: "${label} is required!",
//     range: "${label} must be between ${min} and ${max}",
//     pattern:
//       "Password must contain Atmost 2 special characters Min 2 uppercase characters Min 2 lowercase characters",
//   };
//   const [form] = Form.useForm();

//   // Enable and Disable the submit button
//   const [update, setUpate] = useState(true);
//   return (
//     <Modal
//       visible={visible}
//       title="Change Password"
//       okText="Save"
//       cancelText="Cancel"
//       onCancel={onCancel}
//       onOk={() => {
//         form
//           .validateFields()
//           .then((values) => {
//             onCreate(values);
//           })
//           .catch((info) => {
//             console.log("Validate Failed:", info);
//           });
//       }}
//       okButtonProps={{ disabled: update }}
//     >
//       <Form
//         validateMessages={validateMessages}
//         aria-disabled="false"
//         form={form}
//         layout="vertical"
//         name="changePassword"
//         initialValues={{
//           modifier: "public",
//         }}
//       >
//         <Form.Item
//           name="currentPassword"
//           label="Current Password"
//           rules={[
//             {
//               required: true,
//               message: "Please type your current password!",
//             },
//           ]}
//         >
//           <Input.Password placeholder="Enter your current password" />
//         </Form.Item>
//         <Form.Item
//           name="newPassword"
//           label="New Password"
//           rules={[
//             {
//               required: true,
//               min: 6,
//               max: 15,
//             },
//             {
//               pattern:
//                 /^(?=.*[a-z].*2)(?=.*[A-Z].*2)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
//               message:
//                 "Password must contain Atmost 2 special characters Min 2 uppercase characters Min 2 lowercase characters",
//             },
//           ]}
//           hasFeedback
//         >
//           <Input.Password placeholder="Enter your new password" />
//         </Form.Item>

//         <Form.Item
//           name="confirm"
//           label="Confirm Password"
//           dependencies={["newPassword"]}
//           hasFeedback
//           rules={[
//             {
//               required: true,
//               message: "Please confirm your password!",
//             },
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (!value || getFieldValue("newPassword") === value) {
//                   setUpate(false);
//                   return Promise.resolve();
//                 }
//                 return Promise.reject(new Error("Password do not match!"));
//               },
//             }),
//           ]}
//         >
//           <Input.Password placeholder="Re-enter your new password" />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// const ChangePassword = () => {
//   let navigate = useNavigate();
//   const [visible, setVisible] = useState(false);

//   const onCreate = (values) => {
//     console.log("Received values of form: ", values);
//     PostWithAuthTokenAsync("/users/changePassword.php", values)
//       .then((res) => {
//         console.log(res.data.message);
//         if (res.data.message === "Password updated successfully") {
//           message.success(res.data.message);
//           localStorage.clear();
//           navigate("/"); // Redirect to login page
//         } else {
//           message.error(res.data.message);
//         }
//       })
//       .catch((e) => console.log(e));
//   };

//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => {
//           setVisible(true);
//         }}
//       >
//         Change Password
//       </Button>
//       <ChangePasswordForm
//         visible={visible}
//         onCreate={onCreate}
//         onCancel={() => {
//           setVisible(false);
//         }}
//       />
//     </div>
//   );
// };

// export default ChangePassword;
