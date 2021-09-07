import React, { Component } from "react";
import GroupDataService from "../../services/group.service";
import { Link } from "react-router-dom";

export default class GroupsList extends Component {
  
  constructor(props) {
    super(props);
    this.retriveGroups = this.retriveGroups.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveGroup = this.setActiveGroup.bind(this);
    this.removeAllGroups = this.removeAllGroups.bind(this);

    this.state = {
      groups: [],
      currentGroup: null,
      currentIndex: -1,
      loggedInStatus: false,
    };
  }

  componentDidMount() {
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

  refreshList() {
    this.retriveGroups();
    this.setState({
      currentGroup: null,
      currentIndex: -1
    });
  }

  setActiveGroup(group, index) {
    this.setState({
      currentGroup: group,
      currentIndex: index
    });
  }

  removeAllGroups() {
    GroupDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { groups, currentGroup, currentIndex } = this.state;

    return (
      // <div className="list row">
      <div className="row">
        <div className="col-md-8">
          <div className="input-group mb-3">

            <div className="input-group-append">
              <div

              >
                <Link to={"/add-group"} className="btn btn-outline-secondary" >
                  Add New
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Groups List</h4>

          <ul className="list-group">
            {groups &&
              groups.map((group, index) => (
                <li
                  id={index}
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveGroup(group, index)}
                >
                  {group.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllGroups}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentGroup ? (
            <div>
              <h4>Group</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentGroup.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentGroup.description}
              </div>
              <div>
                <label>
                  <strong>Users:</strong>
                </label>{" "}
                {/* {currentGroup.users ? "Have Users" : "Not Yet"} */}
                {currentGroup.users &&
                    currentGroup.users.map((user, index) => (
                        <button id={index} className="m-1 btn btn-sm btn-secondary">{user.lastname}</button> 
                    )
                    )
                }

              </div>

              <Link
                to={"/groups/" + currentGroup.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Group...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}