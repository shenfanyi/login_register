
import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import './register.css';
import { Form, Input, Button } from 'antd';

class RegistrationForm extends React.Component {

  state = {
    username: '', 
    password: '',
    confirmDirty: false,
  };

  handleSubmit = e => {
    console.log('request');
    e.preventDefault();
    if(!this.state.password || !this.state.username ){
      return
    }
    let regUsername = /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/;
    if (!regUsername.test(this.state.username)){
      alert('用户名格式错误，限25个字符，限数字中英文')
      return
    }
    let regPassword = /^.{1,25}$/;
    if (!regPassword.test(this.state.password)){
      alert('密码格式错误，限25个字符')
      return
    }
    if (this.state.confirmDirty){
      alert('二次密码错误')
      return
    }
    let data = {username: this.state.username, password: this.state.password};
    console.log(data);
    let url = 'http://localhost:8000/user/register/';
    axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
      ).then(res=>{
        if(res.status === 200 && res.data.code===1){
            alert('注册成功')
        }
        else{
            console.log(res)
            alert('注册失败, '+res.data.msg)
        }
    })
  };

  handleUsername = e =>{
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = e =>{
    this.setState({
      password: e.target.value
    })
  }

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item label="用户名"> 
          {getFieldDecorator('username', {
            rules: [
              { 
                required: true, 
                message: '请输入用户名，限25个字符，限数字中英文', 
                pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/
              }
            ],
          })(
            <Input onChange={this.handleUsername}/>,
          )}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码，限25个字符',
                pattern: /^.{1,25}$/
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password  onChange={this.handlePassword} />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入密码',
                pattern: /^.{1,25}$/
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
            注册
          </Button>
          <a href="/login">回到登陆页</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'normal_register' })(RegistrationForm);
  
export default WrappedRegistrationForm;
