import React, { Component } from 'react';
import { FormGroup,FormControl,Col,ControlLabel,Button,Form, Checkbox,Alert} from 'react-bootstrap';
import {request} from "../App";

class FormComponets extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            form : {
                username:{
                    value: '',
                    valid: false,
                    error: ''
                },
                password:{
                    value: '',
                    valid: false,
                    error: ''
                }
            },
            loginErrorFlag: 'none'
        }
    }

    getValidationState(stateFormField) {
        switch (stateFormField) {
            case 'username': {
                if (this.state.form.username.valid === false) {
                    return 'error'
                }
                break
            }
            case 'password': {
                if (this.state.form.username.valid === false) {
                    return 'error'
                }
                break
            }
        }
        return null;
    }

    handleChange(stateFormField,value) {
        const {form} = this.state
        const valuePack = {value,valid: true,error:''}
        switch (stateFormField) {
            case 'username': {
                if (value.length === 0) {
                    valuePack.valid = false
                    valuePack.error = '请输入用户名'
                } else if( value.length < 3 || value.length > 15) {
                    valuePack.valid = false
                    valuePack.error = '用户名长度只允许3-15个字符'
                }
                break
            }
            case 'password': {
                if (value.length < 8) {
                    valuePack.valid = false
                    valuePack.error = '密码长度至少8位'
                }
                break
            }
        }
        this.setState({
            form: {
                ...form,
                [stateFormField]: valuePack
            }
        })
    }

    requestForLogin(method, url, body) {
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
            if (response.status === 404) {
            } else {
                return response.json()
            }
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const {form} = this.state
        const {form:{username,password}} = this.state

        if (!username.valid || !password.valid) {
            this.setState({
                loginErrorFlag: true
            })
            return
        }
        this.requestForLogin('POST',"http://localhost:3000/login",{
            username: username.value,
            password: password.value
        })
    }

    render() {
        const {form: {username,password}} = this.state
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState('username')}>
                    <Col smOffset={3} componentClass={ControlLabel} sm={2}>
                        username
                    </Col>
                    <Col sm={3}>
                        <FormControl type="string" placeholder={'username' || this.state.form.username.error} onChange={(e) => this.handleChange('username',e.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState('password')}>
                    <Col smOffset={3} componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={3}>
                        <FormControl type="password" placeholder={'username' || this.state.form.username.error} onChange={(e) => this.handleChange('password',e.target.value)}/>
                    </Col>
                </FormGroup>
                {/*<span>{(!this.state.form.username.valid) || (!this.state.form.password.valid) ? '请输入正确的用户名和密码': null}</span>*/}
                <Col smOffset={5} sm={3}>
                    <Alert smOffset={3} bsStyle="danger" style={{display: this.state.loginErrorFlag}}>   '请输入正确的用户名和密码' </Alert>
                </Col>
                <FormGroup>
                    <Col smOffset={5} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={6} sm={10}>
                        <Button type="submit" onClick={(e) => this.handleSubmit(e)}>Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default FormComponets;
