import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "../container/signIn/SignIn";
import SignUp from "../container/signUp/SignUp";
import Home from "../container/home/Home";

export const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </div>
  </BrowserRouter>
);
