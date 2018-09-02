import React from 'react'
import {FormGroup, FormControl, Col, ControlLabel, Button, Form, Checkbox, Alert} from 'react-bootstrap'

class SignInForm extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      form: {
        username: '',
        password: ''
      },
      isLoginError: false,
      url: 'http://localhost:3000/signIn'
    }
  }

  handleChange(stateFormField, value) {
    const {form} = this.state
    this.setState({
      ...this.state,
      form: {
        ...form,
        [stateFormField]: value
      }
    })
  }

  requestForSignIn(method, url, body) {
    if (method === 'GET') {
      body = undefined
    } else {
      body = body && JSON.stringify(body)
    }
    return fetch(url, {
      method,
      header: {},
      body
    }).then((response) => {
      if (response.status === 200) {
      } else if (response.status === 404) {
        this.setState({
          ...this.state,
          isLoginError: true
        })
      } else {
        return response.json()
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {form: {username, password}} = this.state

    this.requestForSignIn('POST', this.state.url, {
      username: username,
      password: password
    })
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col smOffset={3} componentClass={ControlLabel} sm={2}>
            username
          </Col>
          <Col sm={3}>
            <FormControl type="string" placeholder='username'
                         onChange={(e) => this.handleChange('username', e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col smOffset={3} componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={3}>
            <FormControl type="password" placeholder='username'
                         onChange={(e) => this.handleChange('password', e.target.value)}/>
          </Col>
        </FormGroup>
        <Col smOffset={5} sm={3}>
          <Alert bsStyle="danger" style={{display: this.state.isLoginError ? true : 'none'}}> '请输入正确的用户名和密码' </Alert>
        </Col>
        <FormGroup>
          <Col smOffset={5} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={6} sm={10}>
            <Button type="submit" onClick={(e) => this.handleSubmit(e)}>Sign In</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default SignInForm
