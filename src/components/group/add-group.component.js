import React, { Component } from "react";
import GroupDataService from "../../services/group.service";

export default class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
    this.newGroup = this.newGroup.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "", 

      nameErr: "",
      descriptionErr: "",

      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveGroup() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    var token = localStorage.getItem("accessToken");


    GroupDataService.create(data, token)
      .then(response => {
        console.log(response.data);

        if(!response.data.error){
            this.setState({
                submitted: true
            });
        }else{
            this.setState({
                nameErr : response.data.error.name,
                descriptionErr : response.data.error.description
            });
            console.log(response.data.error);
        }

      })
      .catch(e => {
        console.log(e);
      });
  }

  newGroup() {
    this.setState({
      id: null,
      name: "",
      description: "",
      published: false,

      submitted: false
    });
  }

    render() {
        const { nameErr, descriptionErr} = this.state;

        return (
        <div className="submit-form">
            {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newGroup}>
                Add
                </button>
            </div>
            ) : (
            <div>
                <h2>Add Group</h2>
                <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                />
                <span className="text-danger">{nameErr}</span>
                </div>

                <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                />
                <span className="text-danger">{descriptionErr}</span>
                </div>


                <button onClick={this.saveGroup} className="btn btn-success">
                    Add
                </button>
            </div>
            )}
        </div>
        );
    }
}