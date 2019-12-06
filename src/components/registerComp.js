
import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios'
import 'antd/dist/antd.css';
import './register.css';
import { Form, Input, Button } from 'antd';

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
    username: '', 
    password: '',
  };

  submitH = () => {
    if(!this.state.password || !this.state.username ){
      return
    }
    let data = {username: this.state.username, password: this.state.password}
    let url = '.....'
    axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
      ).then(res=>{
        if(res.status === 200){
            alert('注册成功')
            this.props.history.push('/login')
        }
        else{
            console.log(res)
            alert('注册失败')
        }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.submitH();
  };

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
            rules: [{ required: true, message: '请输入用户名，限25个字符，限数字中英文', pattern: /^[A-Za-z0-9\u4e00-\u9fa5]{1,25}$/}],
          })(
            <Input/>,
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

// ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('container'));
  
export default WrappedRegistrationForm;
