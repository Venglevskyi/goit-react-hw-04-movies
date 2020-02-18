import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../../routes";

import styles from "./navigation.module.css";

const Navigation = () => (
  <header className={styles.siteNavigation}>
    <nav>
      <ul className={styles.menu}>
        <li className={styles.menuList}>
          <NavLink exact to={routes.HOME} className={styles.link} activeClassName={styles.activeLink}>Home</NavLink>
        </li>
        <li className={styles.menuList}>
          <NavLink to={routes.SEARCH_MOVIES} className={styles.link} activeClassName={styles.activeLink}>Movies</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
