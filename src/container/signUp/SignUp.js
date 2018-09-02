import React, { Component } from 'react'
import SignUpForm from '../../componets/SignUpForm/SignUpForm'
class SignUp extends Component {
  render () {
    return (
      <div>
        <SignUpForm formType='signUp' url='http://localhost:3000/signup'></SignUpForm>
      </div>
    )
  }
}

export default SignUp
