import React from 'react'
import { FormGroup, FormControl, Col, ControlLabel, Button, Form, Alert } from 'react-bootstrap'

class SignUpForm extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      form: {
        username: {
          value: '',
          valid: false,
          error: '',
          isSet: false
        },
        password: {
          value: '',
          valid: false,
          error: '',
          isSet: false
        },
        repeatPassword: {
          value: '',
          valid: false,
          error: '',
          isSet: false
        },
        hasCommit: false
      },
      url: 'http://127.0.0.1:8080/addAccount'
    }
  }

  getValidationState (stateFormField) {
    if (this.shouldAlert(stateFormField)) return 'error'
    return null
  }

  handleChange (stateFormField, value) {
    const { form } = this.state
    const changedFormField = this.validateFormField(stateFormField, value)
    this.setState({
      ...this.state,
      form: {
        ...form,
        ...changedFormField,
        hasCommit: false
      }

    })
  }

  validateFormField (stateFormField, value) {
    switch (stateFormField) {
      case 'username': {
        return this.validateForUsername(value)
      }
      case 'password': {
        return { ...this.vaildateForPassword(value), ...this.validateForRepeatPassword(value, this.state.form.repeatPassword.value) }
      }
      case 'repeatPassword': {
        return this.validateForRepeatPassword(this.state.form.password.value, value)
      }
      default:
        return {}
    }
  }

  validateForRepeatPassword (passwordValue, repeatPasswordValue) {
    const form = {}
    const valuePack = { value: repeatPasswordValue, valid: true, error: '', isSet: (repeatPasswordValue !== '') }
    if (repeatPasswordValue.length === 0) {
      valuePack.valid = false
      valuePack.error = '再次输入密码不能为空'
    } else if (repeatPasswordValue !== passwordValue) {
      valuePack.valid = false
      valuePack.error = '两次输入密码不一致'
    }
    form['repeatPassword'] = valuePack
    return form
  }

  vaildateForPassword (value) {
    const form = {}
    const valuePack = { value, valid: true, error: '', isSet: (value !== '') }
    if (value.length < 8) {
      valuePack.valid = false
      valuePack.error = '密码长度至少8位'
    }
    form['password'] = Object.assign({}, valuePack)
    return form
  }

  validateForUsername (value) {
    const form = {}
    const valuePack = { value, valid: true, error: '', isSet: (value !== '') }
    if (value.length === 0) {
      valuePack.valid = false
      valuePack.error = '请输入用户名'
    } else if (value.length < 3 || value.length > 15) {
      valuePack.valid = false
      valuePack.error = '用户名长度只允许3-15个字符'
    }
    form['username'] = valuePack
    return form
  }

  requestForSign (method, url, body) {
    if (method === 'GET') {
      body = undefined
    } else {
      body = body && JSON.stringify(body)
    }
    return fetch(url, {
      method,
      mode: 'cors',
      header: {},
      body: body
    }).then((response) => {
      if (response.status === 404) {
        // TODO
      } else {
        return response.json()
      }
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    // 防止重复提交
    if (this.state.form.hasCommit) return

    // 验证所有字段
    const form = Object.keys(this.state.form).filter((key) => (key !== 'hasCommit')).reduce((acc, key) => {
      return { ...acc, ...this.validateFormField(key, this.state.form[key].value) }
    }, {})

    // setState 并发送POST请求
    this.setState({
      ...this.state,
      form: {
        ...form,
        hasCommit: true
      }
    }, () => {
      const { form: { username, password, repeatPassword } } = this.state
      if (username.valid && password.valid && repeatPassword.valid) {
        this.requestForSign('POST', this.state.url, {
          username: username.value,
          password: password.value
        })
      }
    })
  }

  shouldAlert (stateFormField) {
    if (this.state.form[stateFormField].isSet) {
      return !this.state.form[stateFormField].valid
    } else {
      return this.state.form.hasCommit
    }
  }

  render () {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState('username')}>
          <Col smOffset={3} componentClass={ControlLabel} sm={2}>
            username
          </Col>
          <Col sm={3}>
            <FormControl type="string" placeholder='username'
              onChange={(e) => this.handleChange('username', e.target.value)}/>
          </Col>
        </FormGroup>
        <Col smOffset={5} sm={3}>
          <Alert bsStyle="danger"
            style={{ display: this.shouldAlert('username') ? true : 'none' }}>             {this.state.form.username.error}           </Alert>
        </Col>
        <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState('password')}>
          <Col smOffset={3} componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={3}>
            <FormControl type="password" key="password" placeholder="password"
              onChange={(e) => this.handleChange('password', e.target.value)}/>
          </Col>
        </FormGroup>
        <Col smOffset={5} sm={3}>
          <Alert bsStyle="danger"
            style={{ display: this.shouldAlert('password') ? true : 'none' }}>             {this.state.form.password.error}           </Alert>
        </Col>
        <FormGroup controlId="formHorizontalRepeatPassword" validationState={this.getValidationState('repeatPassword')}>
          <Col smOffset={3} componentClass={ControlLabel} sm={2}>
            Repeat Password
          </Col>
          <Col sm={3}>
            <FormControl type="password" key="repeat password" placeholder='repeat password'
              onChange={(e) => this.handleChange('repeatPassword', e.target.value)}/>
          </Col>
        </FormGroup>
        <Col smOffset={5} sm={3}>
          <Alert bsStyle="danger"
            style={{ display: this.shouldAlert('repeatPassword') ? true : 'none' }}>             {this.state.form.repeatPassword.error}           </Alert>
        </Col>
        <FormGroup>
          <Col smOffset={6} sm={10}>
            <Button type="submit" onClick={(e) => this.handleSubmit(e)}>Sign Up</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default SignUpForm
