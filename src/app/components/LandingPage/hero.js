"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/hero.module.css";
import { FaFileSignature, FaFileUpload, FaFolder } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [viewData, setViewData] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [signatures, setSignatures] = useState([]);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Load saved signatures from LocalStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("signatures")) || [];
    setSignatures(saved);
  }, []);

  // Delete a signature
  const deleteSignature = (index) => {
    const updated = signatures.filter((_, idx) => idx !== index);
    setSignatures(updated);
    localStorage.setItem("signatures", JSON.stringify(updated));
    setOpenMenuIndex(null);
  };

  return (
    <div className={styles["dashboardWrapper"]}>
      {/* Sidebar */}
      <aside className={styles["sidebar"]}>
        <div className={styles["userBox"]}>
          <div className={styles["avatar"]}></div>
          <div>
            <h4>Shubham Pawar</h4>
            <p>shubhpawar1703@gmail.com</p>
          </div>
        </div>

        <div className={styles["wrapper-list"]}>
          <ul className={styles["menuList"]}>
            <li className={styles["active"]}>Dashboard</li>
            <li>My Files</li>
            <li>Templates</li>
            <li>Account Settings</li>
          </ul>

          <button className={styles["logout"]}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles["mainContent"]}>
        <h1>Welcome to EzSignly</h1>
        <p className={styles["subText"]}>
          Sign and manage your documents, effortlessly.
        </p>

        {/* Top Cards */}
        <div className={styles["cardRow"]}>
          <div
            className={styles["card"]}
            onClick={() => router.push("/createSign")}
            style={{ cursor: "pointer" }}
          >
            <FaFileSignature className={styles["cardIcon"]} />
            <h3>Create Signature</h3>
            <p>Draw or type a new signature</p>
          </div>

          <div
            className={styles["card"]}
            onClick={() => router.push("/uploadDocument")}
            style={{ cursor: "pointer" }}
          >
            <FaFileUpload className={styles["cardIcon"]} />
            <h3>Upload Document</h3>
            <p>Start a new signing workflow</p>
          </div>

          <div
            className={styles["card"]}
            onClick={() => router.push("/myFiles")}
            style={{ cursor: "pointer" }}
          >
            <FaFolder className={styles["cardIcon"]} />
            <h3>My Files</h3>
            <p>Access your document library</p>
          </div>
        </div>

        {/* Recent Activity */}
        <h2 className={styles["sectionTitle"]}>Recent Activity</h2>

        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>Signature Name</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {signatures.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No signatures created yet.
                </td>
              </tr>
            )}

            {signatures.map((sig, index) => (
              <tr key={index}>
                <td>{`Signature - ${sig.name}`}</td>

                <td>
                  <span className={styles["greenBadge"]}>Created</span>
                </td>

                <td>{sig.createdAt}</td>

                {/* DOT MENU */}
                <td style={{ position: "relative", cursor: "pointer" }}>
                  <span onClick={() => toggleMenu(index)}>⋯</span>

                  {openMenuIndex === index && (
                  <div className={styles["dropdown-menu"]}>

                  <p
                    className={styles["dropdown-item"]} 
                    onClick={() => {
                      setViewData(sig);
                      setShowViewPopup(true);
                      setOpenMenuIndex(null);
                    }}
                  >
                    View
                  </p>
                
                  <p
                    className={styles["dropdown-item"]}
                    onClick={() => router.push(`/createSign?edit=${index}`)}
                  >
                    Edit
                  </p>
                
                  <p
                    className={styles["dropdown-item"]}
                    onClick={() => deleteSignature(index)}
                  >
                    Delete
                  </p>
                
                </div>
                
                  )}
    

                </td>
              </tr>
            ))}   
 
          </tbody>
        </table>
        {showViewPopup && (
  <div className={styles["modal-overlay"]}>
    <div className={styles["modal-box"]}>
      <h3 className={styles["modal-title"]}>Signature Preview</h3>

      <div className={styles["modal-preview"]}>
        <p
          style={{
            fontFamily: viewData?.font,
            fontSize: viewData?.size,
            color: viewData?.color,
          }}
        >
          {viewData?.name}
        </p>
      </div>

      <button
        className={styles["close-btn"]}
        onClick={() => setShowViewPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default Hero;
