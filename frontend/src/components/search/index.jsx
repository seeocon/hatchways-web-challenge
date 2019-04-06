import React, { Component } from "react";
import styles from "./styles.module.css";
const Search = ({ name, query, placeholderText, updateQueryText }) => (
  <div className={styles.searchBarContainer}>
    <input
      name={name}
      value={query}
      placeholder={placeholderText}
      onChange={event => updateQueryText(event)}
    />
  </div>
);

export default Search;
