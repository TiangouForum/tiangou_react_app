import React from 'react'
import ReactDOM from 'react-dom'
import SignIn from '../signIn'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SignIn />, div)
  ReactDOM.unmountComponentAtNode(div)
})
