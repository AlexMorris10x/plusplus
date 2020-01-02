import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, Form, Container } from "semantic-ui-react";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    redirectTo: null
  };

  writeText = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signUp = event => {
    const { username, password, confirmPassword } = this.state;
    event.preventDefault();
    if (
      username &&
      username.length > 0 &&
      password &&
      password.length > 0 &&
      confirmPassword &&
      confirmPassword.length > 0
    ) {
      axios
        .post("/auth/signup", {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          if (!response.data.errmsg) {
            // this.props.login(this.state.username, this.state.password);
            this.setState({
              redirectTo: "/"
            });
          } else {
            console.log(response.data.errmsg);
          }
        });
    }
  };
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="CustomForm">
        <Container text>
          <h1>Signup form</h1>
          <Form>
            <Form.Field>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.writeText}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.writeText}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.writeText}
              />
            </Form.Field>
            <Button
              basic={true}
              color={"blue"}
              onClick={this.signUp}
              content={"Sign Up"}
              disabled={
                this.state.username.length === 0 ||
                this.state.password.length === 0 ||
                this.state.confirmPassword.length === 0
              }
            />
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
