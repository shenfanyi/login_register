
import React from 'react';
import 'antd/dist/antd.css';
import './login.css';
import { Form, Input, Button } from 'antd';
import axios from 'axios'

class NormalLoginForm extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = e => {
    console.log('request');
    e.preventDefault(); 
    if(!this.state.username || !this.state.password){
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
    let data = {username: this.state.username, password: this.state.password};
    console.log(data);
    let url = 'http://localhost:8000/user/login/';
    axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
    ).then(res=>{
      if(res.status === 200 && res.data.code===1){
          alert('登录成功。')
      }
      else{
          console.log(res)
          alert('登录失败：' + res.data.msg)
      }
    })
  }

  handleChangeUsername = e => {
    this.setState({
        username: e.target.value
    })
}

  handleChangePwd = e => {
      this.setState({
          password: e.target.value
      })
  }

  render() {
    // console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/}],
          })(
            <Input onChange={this.handleChangeUsername}
            />,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码', pattern: /^.{1,25}$/}],
          })(
            <Input
              type="password"
              onChange={this.handleChangePwd}
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

export default WrappedNormalLoginForm;