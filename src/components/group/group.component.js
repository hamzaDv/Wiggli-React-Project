import React, { Component } from "react";
import GroupDataService from "../../services/group.service";

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);

    this.state = {
      currentGroup: {
        id: null,
        name: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getGroup(this.props.match.params.id);


  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentGroup: {
          ...prevState.currentGroup,
          name: name
        }
      };
    });

  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function(prevState) {
      return {
        currentGroup: {
          ...prevState.currentUser,
          description: description
        }
      };
    });
  }

  getGroup(id) {
    GroupDataService.get(id)
      .then(response => {
        this.setState({
          currentGroup: response.data.groups[0]
        });
        // console.log(response.data.groups[0]);

      })
      .catch(e => {
        console.log(e);
      });
  }

  updateGroup() {
    var accessToken = localStorage.getItem("accessToken");

    GroupDataService.update(
      this.state.currentGroup.id,
      this.state.currentGroup,
      accessToken
    ).then(response => {
      console.log(response.data);
      this.setState({
        message: response.data.message
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  deleteGroup() {   
    var accessToken = localStorage.getItem("accessToken");
 
    console.log(this.state.currentGroup.id, accessToken)
    GroupDataService.delete(this.state.currentGroup.id, accessToken)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/groups')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentGroup } = this.state;

    return (
      <div>
        {currentGroup ? (
          <div className="edit-form">
            <h4>Group</h4>
            <form onSubmit={this.updateGroup}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentGroup.name}
                  onChange={this.onChangeName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentGroup.description}
                  onChange={this.onChangeDescription}
                />
              </div>
{/* 
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentGroup.published ? "Published" : "Pending"}
              </div> */}
            </form>

            {/* {currentGroup.published ? (
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
              onClick={this.updateGroup}
            >
              Update
            </button>

            <button
              className="m-2 btn btn-danger"
              onClick={this.deleteGroup}
            >
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}