import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  FormComponents from './componets/FormComponets';
import {
    Alert,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    FormGroup,
    Form,
    FormControl,
    Col,
    ControlLabel,
    Button,
    Jumbotron,
    Checkbox,
    FormItem
} from 'react-bootstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                username: {
                    valid: false,
                    value: '',
                    error: ''
                },
                password: {
                    valid: false,
                    value: '',
                    error: ''
                }
            }
        };

        this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const {form: {username, password}} = this.state;

        postForm('http://localhost:3000/login', {
            username: username.value,
            password: password.value
        }).then((response) => {
            if (response) {
                //todo 跳转到主页
            } else {
                alert('用户名或密码错误')
            }
        })
    }

    onFormChange(field, value, type = 'string') {
        //表单校验逻辑
        const {form} = this.state;

    }

    renderRenter = () => {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="">Tiangou Forum</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>


                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label form="username">用户名</label>
                        <input type="text" value={username.value}
                               onChange={e => onFormChange(username, e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label form="password">密码</label>
                        <input type="text" value={password.value}
                               onChange={e => onFormChange(password, e.target.value)}/>
                    </div>
                    <input type="submit" value="登录"/>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderRenter()}
            </div>
        );
    }
}

export default App;
export  function request(method, url, body) {
    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    return fetch(url, {
        method,
        header: {},
        body
    })
        .then((response) => {
                if (response.status === 401) {

                } else {
                    return response.json();
                }
            }
        );

};
export const postForm = (url, body) => request('POST', url, body);