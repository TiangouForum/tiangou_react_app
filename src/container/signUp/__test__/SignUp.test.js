import React from "react";
import SignUp from "../SignUp";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const div = renderer.create(<SignUp/>).toJSON();
  expect(div).toMatchSnapshot();
});
