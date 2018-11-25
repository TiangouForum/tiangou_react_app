import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import './Home.css'

class Home extends Component {
  render () {
    return (
      <div className="container">
        <Jumbotron>
          <h1 style={{ color: 'green' }}>Welcome to Tiangou Forum!</h1>
          <p style={{ color: 'gray' }}>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        这是一个开放的论坛，这是一片自由的天地，<br/>
                        我们在这里谈天论地，畅所欲言，期待dadsfdsasddfdsasdf你们的加入。
          </p>
          <p>
            <Button bsStyle="primary">了解更多</Button>
          </p>
        </Jumbotron>
      </div>
    )
  }
}
export default Home
