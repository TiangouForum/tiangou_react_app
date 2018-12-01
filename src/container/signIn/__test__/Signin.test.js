import React from 'react'
import renderer from 'react-test-renderer'
import SignIn from '../SignIn'

it('renders correctly', () => {
  const div = renderer.create(<SignIn/>).toJSON();
  expect(div).toMatchSnapshot();
})
