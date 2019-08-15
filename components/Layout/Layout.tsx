import React, { ReactNode } from "react";
import Header from "./components/Header";

import styles from "./Layout.scss";

type LayoutProps = {
  children: ReactNode;
};

type Props = LayoutProps;

const Layout = ({ children }: Props) => (
  <div className={styles.view}>
    <Header />
    <div className={styles.body}>
      <div className={styles.left} />
      <div className={styles.middle}>{children}</div>
      <div className={styles.right} />
    </div>
  </div>
);

export default Layout;
