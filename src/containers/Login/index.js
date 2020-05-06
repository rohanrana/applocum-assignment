import React, { Component } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import TextInput from "../../components/InputComponent/TextInput";
import PasswordInput from "../../components/InputComponent/PasswordInput";
import { ValidateInput } from "./ValidateLogin";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userSignIn } from "../../redux/actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
  }
  handleChange = (e) => {
    let errors = null;
    let name = e.target.name;
    let value = e.target.value;
    if (this.state.errors) {
      errors = Object.assign("", this.state.errors);
      delete errors[e.target.name];
    }

    this.setState({ [e.target.name]: e.target.value, errors: errors }, () => {
      if (this.state[name] !== "") {
        let data = {
          [name]: value,
        };
        const errors = ValidateInput(data);
        if (!errors.isValid) {
          this.setState({ errors: errors.errors });
        }
      }
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    const errors = ValidateInput(data);
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      let payload = {
        user: { email: this.state.email, password: this.state.password },
        device_detail: { device_type: "web", player_id: "" },
      };
      this.props.onSignIn(payload, this.props);
    }
  };
  render() {
    let { errors, email, password } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-wrapper">
          <div>
            {/* --- INPUTS USED HERE ARE REUSABLE COMPONENT--- */}
            <TextInput
              placeholder="Email"
              name={"email"}
              value={email}
              className="lgn-input-field"
              prefix={<UserOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.email}
                className="validation-error"
              />
            )}
            <PasswordInput
              className="lgn-input-field"
              size="large"
              name={"password"}
              value={password}
              prefix={<LockOutlined />}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.password}
                className="validation-error"
              />
            )}
          </div>
          <div className="login-btn-wrapper">
            <button
              //   style={{ background: "white", color: "black" }}
              className="btn-login"
              disabled={this.props.loading}
              onClick={this.handleSubmit}
            >
              {this.props.loading ? "Loading..." : "Login"}
            </button>
            <span className="register-link">
              <Link to="/register">Click Here </Link> To Register
            </span>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (data, props) => dispatch(userSignIn(data, props)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
