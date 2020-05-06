import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import MainApp from "../App";

import NotFound from "../containers/404/404";
import Products from "../containers/Products";
import Login from "../containers/Login";
import { authCheckState } from "../redux/actions";
import { connect } from "react-redux";
import Register from "../containers/Register";
class Root extends Component {
  componentDidMount() {
    this.props.OnAutoSignIn();
  }

  render() {
    const RestrictedRoutes = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          !this.props.isAuthenticated ? (
            <Component />
          ) : (
            // <Component {...props} />
            <Redirect to={"/"} />
          )
        }
      />
    );
    const MustAuthenticatedRoutes = ({
      component: Component,
      parent: Parent,
      ...rest
    }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isAuthenticated ? (
            Parent ? (
              <Parent>
                <Component {...props} {...rest} />
              </Parent>
            ) : (
              <Component {...props} />
            )
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    );
    return (
      <Router>
        <MainApp>
          <Switch>
            {/* {---- MustAuthenticatedRoutes COMPONENT USED FOR GUARDING ROUTES-----} */}
            {!this.props.isAuthenticated && (
              <Route exact path="/" component={Login} />
            )}
            <MustAuthenticatedRoutes exact path="/" component={Products} />
            {/* {---- RestrictedRoutes COMPONENT USED FOR RESTRICT THE ROUTES-----} */}
            <RestrictedRoutes exact path="/login" component={Login} />
            <RestrictedRoutes exact path="/register" component={Register} />
            {/* {----IF UNKONWN ROUTE HIT-----} */}
            <Route path="*" component={NotFound} />
          </Switch>
        </MainApp>
      </Router>
    );
  }
}
const mapStateToProps = ({ auth, commonData }) => {
  return {
    isAuthenticated: auth.userData != null || false
  };
};
const mapDispatchToProps = dispatch => {
  return {
    OnAutoSignIn: () => dispatch(authCheckState())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
