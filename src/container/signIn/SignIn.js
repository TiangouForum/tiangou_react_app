import React, { Component } from 'react'
import SignInForm from '../../componets/SignInForm/SignInForm'
class SignIn extends Component {
  render () {
    return (
      <div>
        <SignInForm formType='signIn' url='http://localhost:3000/signin'></SignInForm>
      </div>
    )
  }
}

export default SignIn
