import React, { Component } from "react";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import TextInput from "../../components/InputComponent/TextInput";
import PasswordInput from "../../components/InputComponent/PasswordInput";
import { ValidateInput } from "./ValidateRegister";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userSignIn } from "../../redux/actions";
import OpenNotification from "../../components/OpenNotification";
import UtilService from "../../service/ApiService";
import { API_SIGN_UP } from "../../constants/ApiConstants";
import { RESPONSE_OK } from "../../constants/common";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      errors: "",
      loading: false,
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
    };

    const errors = ValidateInput(data);
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      let data = {
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          password: this.state.password,
          email: this.state.email,
          phone: `+91${this.state.phone}`,
        },
        device_detail: { device_type: "web", player_id: "" },
      };
      let request = {
        ...API_SIGN_UP,
        request: data,
      };
      this.setState({ loading: true }, () => {
        UtilService.callApi(request, (err, res) => {
          console.log(res);
          if (res.status === RESPONSE_OK) {
            this.setState({ loading: false }, () => {
              OpenNotification({ type: "success", title: res.message });
              this.props.history.push("/login");
            });
          } else {
            this.setState({ loading: false }, () => {
              OpenNotification({ type: "error", title: res.message });
            });
          }
          // if
        });
      });
    }
  };
  render() {
    let {
      errors,
      first_name,
      last_name,
      password,
      phone,
      email,
      loading,
    } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-wrapper">
          <div>
            {/* --- INPUTS USED HERE ARE REUSABLE COMPONENT--- */}
            <TextInput
              placeholder="First Name"
              name={"first_name"}
              value={first_name}
              className="lgn-input-field"
              prefix={<UserOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.first_name}
                className="validation-error"
              />
            )}
            <TextInput
              placeholder="Last Name"
              name={"last_name"}
              value={last_name}
              className="lgn-input-field"
              prefix={<UserOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.last_name}
                className="validation-error"
              />
            )}
            <TextInput
              placeholder="Phone"
              name={"phone"}
              value={phone}
              className="lgn-input-field"
              prefix={<PhoneOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.phone}
                className="validation-error"
              />
            )}
            <TextInput
              placeholder="Email"
              name={"email"}
              value={email}
              className="lgn-input-field"
              prefix={<MailOutlined />}
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
              disabled={loading}
              className="btn-login"
              onClick={this.handleSubmit}
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <span className="register-link">
              <Link to="/login">Click Here</Link> To Login
            </span>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (data, props) => dispatch(userSignIn(data, props)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
