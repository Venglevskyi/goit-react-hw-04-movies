import React from "react";

import styles from "./loader.module.css";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spiner = () => (
  <div className={styles.Spiner}>
    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
  </div>
);

export default Spiner;
