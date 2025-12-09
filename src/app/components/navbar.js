import React from "react";
import styles from "../styles/dashboard/navbar.module.css";
import { FaBell, FaQuestionCircle, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      {/* Left - Logo + Text */}
      <div className={styles["left-section"]}>
        <img
          src="/icons/dashboard-icon.png"   // you will replace this
          alt="Dashboard Icon"
          className={styles["logo-icon"]}
        />
        <h3 className={styles["nav-title"]}>Dashboard</h3>
      </div>

      {/* Right - Icons */}
      <div className={styles["right-section"]}>
        <div className={styles["icon-box"]}>
          <FaBell className={styles["icon"]} />
        </div>

        <div className={styles["icon-box"]}>
          <FaQuestionCircle className={styles["icon"]} />
        </div>

        <div className={styles["profile-box"]}>
          <FaUserCircle className={styles["profile-icon"]} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
