import React, { Component } from "react";
import UserDataService from "../../services/user.service";

export default class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      firstname: "",
      lastname: "",
      type: "",
      email: "",
      age: "",
      phone: "",

      firstnameErr: "",
      lastnameErr: "",
      typeErr: "",
      emailErr: "",
      ageErr: "",
      phoneErr: "",

      published: false,

      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
        firstname: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
        lastname: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
        age: e.target.value
      });
  }

  onChangeEmail(e) {
    this.setState({
        email: e.target.value
      });
  }

  onChangePhone(e) {
    this.setState({
        phone: e.target.value
      });
  }

  onChangeType(e) {
    this.setState({
        type: e.target.value
      });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
      });
  }


  saveUser() {
    var data = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        type: this.state.type,
        age: this.state.age,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password
  
    };

    var token = localStorage.getItem("accessToken");

    UserDataService.create(data, token)
      .then(response => {
        console.log(response.data);

        if(!response.data.error){
            this.setState({
                submitted: true
            });
        }else{
            this.setState({
                firstnameErr : response.data.error.firstname,
                lastnameErr : response.data.error.lastname,
                ageErr : response.data.error.age,
                typeErr : response.data.error.type,
                emailErr : response.data.error.email,
                phoneErr : response.data.error.phone,
                passwordErr : response.data.error.password,
            });
            console.log(response.data.error);
        }

      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      firstname: "",
      lastname: "",
      type: "",
      email: "",
      age: "",
      phone: "",
      password: "",
      published: false,

      submitted: false
    });
  }

    render() {
        const { firstnameErr, lastnameErr, phoneErr, ageErr, emailErr, typeErr, passwordErr} = this.state;

        return (
        <div className="submit-form">
            {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newUser}>
                Add
                </button>
            </div>
            ) : (
            <div>
                <h2>Add User</h2>
                <div className="form-group mb-2">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        required
                        value={this.state.firstname}
                        onChange={this.onChangeFirstName}
                        name="firstname"
                    />
                    <span className="text-danger">{firstnameErr}</span>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        required
                        value={this.state.lastname}
                        onChange={this.onChangeLastName}
                        name="lastname"
                    />
                    <span className="text-danger">{lastnameErr}</span>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="age">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="age"
                        required
                        value={this.state.age}
                        onChange={this.onChangeAge}
                        name="age"
                    />
                    <span className="text-danger">{ageErr}</span>
                </div>

                
                <div className="form-group mb-2">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        required
                        value={this.state.type}
                        onChange={this.onChangeType}
                        name="type"
                    />
                    <span className="text-danger">{typeErr}</span>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        name="email"
                    />
                    <span className="text-danger">{emailErr}</span>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        required
                        value={this.state.phone}
                        onChange={this.onChangePhone}
                        name="phone"
                    />
                    <span className="text-danger">{phoneErr}</span>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        name="password"
                    />
                    <span className="text-danger">{passwordErr}</span>
                </div>


                <button onClick={this.saveUser} className="btn btn-success">
                    Add
                </button>
            </div>
            )}
        </div>
        );
    }
}