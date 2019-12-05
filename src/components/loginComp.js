
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './login.css';
import { Form, Input, Button } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的用户名', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/}],
          })(
            <Input
            />,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/}],
          })(
            <Input
              type="password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
          <a href="/register">没有账号？来注册吧！</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalLoginForm;