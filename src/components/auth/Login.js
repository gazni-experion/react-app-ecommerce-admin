import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  passwords: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .max(15, 'Password should be of maximum 15 characters length')
    .required('Password is required'),
});


function Login() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      passwords: '',
    },
    validateOnMount: true,
    validationSchema: validationSchema,
  
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log(JSON.stringify(values, null, 2));
      axios.post('http://localhost/RESTAPI/ecommerce/api/auth/login.php', 
        JSON.stringify(values)
      )
      .then(function (response) {
        console.log(response.data);
        console.warn(response.status);
        if(response.data.jwt){

          sessionStorage.setItem('token', 'response.data.jwt');
          sessionStorage.setItem('userId', 'response.data.userId');
          sessionStorage.setItem('userName', 'response.data.userName');
          navigate('/admin/dashboard');
        }
        else{
          alert('Invalid Credentials Please try again');
          setIsSubmitting(false);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    },
  });


  return (
     <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="passwords"
          name="passwords"
          label="Password"
          type="password"
          value={formik.values.passwords}
          onChange={formik.handleChange}
          error={formik.touched.passwords && Boolean(formik.errors.passwords)}
          helperText={formik.touched.passwords && formik.errors.passwords}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={ !formik.isValid || isSubmitting}>
          Login
        </Button>
      </form>
    </div>
    )
}

export default Login
    
    // import { Form, Input, Button, Checkbox } from 'antd';
    // import { UserOutlined, LockOutlined } from '@ant-design/icons';
    
    // const Login = () => {
    
    //   let navigate = useNavigate();
    
    //   const onFinish = (values) => {
    //     console.log('Received values of form: ', values);
        
    //     // Check if username and password matches
    //     if (values.username == "admin" && values.password == "admin") {
    //       console.log("Welcome Admin");
    
    //       // Navigate to home page
    //       navigate("admin/dashboard");
    //     }
    //     else{
    //       alert("Invalid Credentials");
    //     }
    //   };
    
    //   return (
    //     <Form
    //       name="normal_login"
    //       className="login-form"
    //       initialValues={{
    //         remember: true,
    //       }}
    //       onFinish={onFinish}
    //     >
    //       <Form.Item
    //         name="username"
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please input your Username!',
    //           },
    //         ]}
    //       >
    //         <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    //       </Form.Item>
    //       <Form.Item
    //         name="password"
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please input your Password!',
    //           },
    //         ]}
    //       >
    //         <Input
    //           prefix={<LockOutlined className="site-form-item-icon" />}
    //           type="password"
    //           placeholder="Password"
    //         />
    //       </Form.Item>
    //       <Form.Item>
    //         <Form.Item name="remember" valuePropName="checked" noStyle>
    //           <Checkbox>Remember me</Checkbox>
    //         </Form.Item>
    
    //         <a className="login-form-forgot" href="">
    //           Forgot password
    //         </a>
    //       </Form.Item>
    
    //       <Form.Item>
    //         <Button type="primary" htmlType="submit" className="login-form-button">
    //           Log in
    //         </Button>
    //         Or <a href="">register now!</a>
    //       </Form.Item>
    //     </Form>
    //   );
    // };
    
    // export default () => <Login />;