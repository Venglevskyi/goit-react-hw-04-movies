import React from "react";
import Header from "../Header/Header";

const styles = {
  maxWidth: 1170,
  marginLeft: "auto",
  marginRight: "auto",
  paddingRight: 12,
  paddingLeft: 12
};

const Layout = ({ children }) => (
  <div style={styles}>
    <Header />
    {children}
  </div>
);

export default Layout;
