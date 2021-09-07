import React, { Component } from "react";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route, Link } from "react-router-dom";
import AuthDataService from "./services/auth.service";
 import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./Login";
import Signup from "./Signup";

import UsersList from "./components/user/users-list.component";
import User from "./components/user/user.component";
import AddUser from "./components/user/add-user.component";

import GroupsList from "./components/group/groups-list.component";
import Group from "./components/group/group.component";
import AddGroup from "./components/group/add-group.component";


function handleLogout(){
  localStorage.clear();
  window.location.pathname = '/Login';
}


function App() {

  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href={"/Login"} className="navbar-brand">
            Wiggli Project
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/groups"} className="nav-link">
                Groups
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to={"/add-group"} className="nav-link">
                Add Group
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add-user"} className="nav-link">
                Add User
              </Link>
            </li> */}
          </div>
          
        <div onClick={handleLogout} className="navbar-text" style={{marginLeft:'70%'}}>
          <span className="nav-link" style={{color: '#96989a !IMPORTANT'}}>Logout</span>
        </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/login"]} component={Login} />
            <Route exact path={["/signup"]} component={Signup} />
            
            <ProtectedRoute exact path={["/", "/groups"]} component={GroupsList} />
            <ProtectedRoute path="/groups/:id" component={Group} />
            <ProtectedRoute exact path="/add-group" component={AddGroup} />

            <ProtectedRoute exact path={["/", "/users"]} component={UsersList} />
            <ProtectedRoute path="/users/:id" component={User} />
            <ProtectedRoute exact path="/add-user" component={AddUser} />
                        
          </Switch>
        </div>
      </div>
  );
}

export default App;
