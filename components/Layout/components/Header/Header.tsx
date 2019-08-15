import React from "react";

import styles from "./Header.scss";

type HeaderProps = {};

type Props = HeaderProps;

const Header = ({  }: Props) => (
  <div className={styles.view}>
    <h1 className={styles.title}>Workshop</h1>
    <h2 className={styles.subtitle}>Formik</h2>
  </div>
);

export default Header;
