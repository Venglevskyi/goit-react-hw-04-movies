import React from "react";
import PropTypes from "prop-types";

import styles from "./buttom.module.css";

const Button = ({clickButton}) => (
    <button type="button" className={styles.Button} onClick={clickButton}>Load more</button>
)

Button.propTypes = {
    clickButton: PropTypes.func.isRequired
  };

export default Button;