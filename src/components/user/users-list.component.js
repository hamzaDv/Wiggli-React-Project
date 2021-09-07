import React, { Component } from "react";
import UserDataService from "../../services/user.service";
import GroupDataService from "../../services/group.service";
import { Link } from "react-router-dom";
import { Button, Modal} from 'react-bootstrap';  

export default class UersList extends Component {
  constructor(props) {
    super(props);
    this.retriveUsers = this.retriveUsers.bind(this);
    this.retriveGroups = this.retriveGroups.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.onChangeGroup = this.onChangeGroup.bind(this);

    this.state = {
      users: [],
      group: "",
      currentUser: null,
      currentIndex: -1,
      show: false
    };
  }

  componentDidMount() {
    this.retriveUsers();
    this.retriveGroups();

  }

  retriveGroups() {
    GroupDataService.getAll()
      .then(response => {
        this.setState({
          groups: response.data.groups
        });
        console.log(response.data.groups);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleModal(){  
    this.setState({show:!this.state.show})  
  } 

  onChangeGroup(e){
    this.setState({
      group : e.target.value
    });
  }

  attachUser(){  
    const { currentUser , group } = this.state;

    console.log("UserId", currentUser.id);
    console.log("GroupId", group);
    var token = localStorage.getItem("accessToken");

    UserDataService.attach(currentUser.id, group, token)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: response.data.message,
          show:!this.state.show
        });
        this.refreshList();

      })
      .catch(e => {
          console.log(e);
      });

  } 

  retriveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data.users
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retriveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { groups, users, currentUser, currentIndex } = this.state;

    return (
      // <div className="list row">
      <div className="row">
        <div className="col-md-8">
          <div className="input-group mb-3">

            <div className="input-group-append">
              <div

              >
                <Link to={"/add-user"} className="btn btn-outline-secondary" >
                  Add New
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  id={index}
                >
                  {user.firstname +" "+user.lastname}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Full Name:</strong>
                </label>{" "}
                {currentUser.firstname +" "+currentUser.lastname}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentUser.age}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentUser.phone}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Groups:</strong>
                </label>{" "}
                {currentUser.groups &&
                    currentUser.groups.map((group, index) => (
                        <button id={index} className="m-1 btn btn-sm btn-secondary">{group.name}</button> 
                    )
                    )
                }

              </div>

              <Link
                to={"/users/" + currentUser.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
              
              <Button onClick={()=>this.handleModal()}
                className="m-2 btn btn-success">
                  Attach
              </Button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Group...</p>
            </div>
          )}

        <Modal show={this.state.show} onHide={()=>this.handleModal()}>  
          <Modal.Header closeButton>Attach User To Groups</Modal.Header>  
          <Modal.Body>
              <p> Select a group for this user</p>
             

            <select id="groups" onChange={this.onChangeGroup} className="m-2 w-100">
              <option disabled selected>Select the group</option>
              {groups &&
                  groups.map((group, index) => (
                    <option id={index} value={group.id}>{group.name}</option>
                    )
                    )
                  }
            </select>
          </Modal.Body>
          <Modal.Footer>  
            <Button variant="primary" onClick={()=>this.attachUser()}>Attach</Button>  
            <Button variant="secondary" onClick={()=>this.handleModal()}>Close</Button>  
          </Modal.Footer>  
        </Modal>  
        </div>
      </div>
    );
  }
}