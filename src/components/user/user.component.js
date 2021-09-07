import React, { Component } from "react";
import UserDataService from "../../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        phone: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    const firstname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          firstname: firstname
        }
      };
    });
  }

  onChangeLastName(e) {
    const lastname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          lastname: lastname
        }
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        age: age
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        phone: phone
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data.users[0]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateUser() {
    var token = localStorage.getItem("accessToken");

    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser,
      token
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: response.data.message
        });
      })
      .catch(e => {
        console.log(e);
    });
  }

  deleteUser() {  
    var token = localStorage.getItem("accessToken");
  
    UserDataService.delete(this.state.currentUser.id, token)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form onSubmit={this.updateUser}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentUser.firstname}
                  onChange={this.onChangeFirstName}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentUser.lastname}
                  onChange={this.onChangeLastName}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentUser.age}
                  onChange={this.onChangeAge}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentUser.phone}
                  onChange={this.onChangePhone}
                  required
                />
              </div>

 
            {/*<div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.published ? "Published" : "Pending"}
              </div> */}
            </form>

            {/* {currentUser.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateUser}
            >
              Update
            </button>

            <button
              className="m-2 btn btn-danger"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <p className="text-success">{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}