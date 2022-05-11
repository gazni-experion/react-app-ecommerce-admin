import "../Styles/styles.css";
import React, { useEffect ,useState} from "react";
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import '../Components/Config/api';


function AboutUs() {
    const [data, setData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
       
      };

    useEffect(() => {
        axios.get('/categories/read.php')
      .then(function (response) {
          let dat = response.data.records;
          console.log(dat.categoryName);
     
        setData(dat);
        // form.setFieldsValue({
        //     title: response.data.records.title,
        //     content: response.data.records,
        //   });
      })
      .catch(function (error) {
        console.log(error);
      });
    },[]);
  return (
    <div className="container">
      <h2>About Us</h2>
      <hr />
      <Form
      form={form}
      autoComplete="off"
      onFinish={onFinish}
    //   initialValues={form}
    >
      <Form.Item
        name="title"
        label="title"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="content"
        label="content"
      >
        <Input.TextArea />
      </Form.Item>

      

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      <span className="text-area"><Input.TextArea disabled={isEdit} rows={6} /></span>
      </div>
  )
}

export default AboutUs