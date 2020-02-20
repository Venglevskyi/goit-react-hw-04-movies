import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../../pages/css/homePage.module.css";

export default class SearchForm extends Component {
  state = { inputValue: "" };

  handleChange = ({ target }) => {
    this.setState({
      inputValue: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form className={styles.Form} onSubmit={this.handleSubmit}>
        <input
          className={styles.FormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={inputValue}
          onChange={this.handleChange}
        />
        <button className={styles.FormButton} type="submit">
          Search
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
