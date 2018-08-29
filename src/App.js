import React, { Component } from 'react';
import './App.css';
import  FormComponents from './componets/FormComponets';
import { Navbar } from 'react-bootstrap';

class App extends Component {
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
                <FormComponents></FormComponents>
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
