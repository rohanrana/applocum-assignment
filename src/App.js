import React from "react";
import { Layout, Menu } from "antd";

import "./App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {  LogoutOutlined } from "@ant-design/icons";
import { userSignOut } from "./redux/actions";
const { Header, Content, } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <Header
          style={{
            justifyContent: !this.props.isAuthenticated
              ? "center"
              : "flex-start",
          }}
          className="header"
        >
          <div onClick={() => this.props.history.push("/")} className="logo">
            <span>Applocum International</span>
          </div>

          {this.props.isAuthenticated && (
            <React.Fragment>
              <Menu
                defaultSelectedKeys={["people"]}
                defaultOpenKeys={["sub1"]}
                onClick={(e) => {
                  this.props.onSignout(this.props);
                }}
                className="logout-panel"
                theme="dark"
                mode="horizontal"
              >
                <Menu.Item key="people">
                  <span>
                    <LogoutOutlined />
                    Logout
                  </span>
                </Menu.Item>
              </Menu>
            </React.Fragment>
          )}
        </Header>
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSignout: (data) => dispatch(userSignOut(data)),
  };
};
const mapStateToProps = ({ auth }) => {
  return {
    loading:auth.logoutloading,
    isAuthenticated: auth.userData != null || false,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
