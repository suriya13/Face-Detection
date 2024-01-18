import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input , Card} from 'antd';


const Register = (props) => {

    const {onRouteChange} = props
  const onFinish = (values) => {
    console.log("dc");
  };
  return (
    <div className='signin'>
    <Card style={{
        width: '30%',
      }}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
      name='email'
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input  placeholder="Enter your email" prefix={<MailOutlined className="site-form-item-icon" />}/>
    </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>onRouteChange('home')}>
          Register
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </div>
  );
};
export default Register;