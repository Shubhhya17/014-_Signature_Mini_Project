"use client";

import React, { useState, useRef, useEffect } from "react";
import SignaturePad from "signature_pad";
import styles from "../styles/createsign/sign.module.css";
import { useSearchParams, useRouter } from "next/navigation";

const fontMap = {
  "Dancing Script": "var(--font-dancing-script)",
  "Great Vibes": "var(--font-great-vibes)",
  Pacifico: "var(--font-pacifico)",
  Allura: "var(--font-allura)",
};

const CreateSign = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editIndex = searchParams.get("edit");

  const [activeTab, setActiveTab] = useState("type");
  const [name, setName] = useState("Shubham Pawar");
  const [font, setFont] = useState("Dancing Script");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(36);
  const [uploadImage, setUploadImage] = useState(null);

  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  // Load data if editing
  useEffect(() => {
    if (editIndex !== null) {
      const all = JSON.parse(localStorage.getItem("signatures")) || [];
      const sig = all[editIndex];

      if (sig) {
        setName(sig.name);
        setFont(sig.font);
        setColor(sig.color);
        setSize(sig.size);
      }
    }
  }, []);

  // Initialize Draw Signature Pad
  useEffect(() => {
    if (activeTab === "draw") {
      const canvas = canvasRef.current;
      const signaturePad = new SignaturePad(canvas, {
        penColor: color,
      });
      signaturePadRef.current = signaturePad;
    }
  }, [activeTab, color]);

  // Upload Handler
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadImage(URL.createObjectURL(file));
  };

  // Save Signature
  const saveSignature = () => {
    const old = JSON.parse(localStorage.getItem("signatures")) || [];

    const newData = {
      name,
      font,
      color,
      size,
      createdAt: new Date().toLocaleDateString(),
    };

    if (editIndex !== null) old[editIndex] = newData;
    else old.push(newData);

    localStorage.setItem("signatures", JSON.stringify(old));
    router.push("/");
  };

  return (
    <div className={styles["signature-wrapper"]}>
      <h1 className={styles["title"]}>
        {editIndex !== null ? "Edit Signature" : "Create Your Signature"}
      </h1>

      {/* Tabs */}
      <div className={styles["tabs"]}>
        <button
          className={`${styles["tab"]} ${
            activeTab === "type" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("type")}
        >
          Type Signature
        </button>

        <button
          className={`${styles["tab"]} ${
            activeTab === "draw" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("draw")}
        >
          Draw Signature
        </button>

        <button
          className={`${styles["tab"]} ${
            activeTab === "upload" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Signature
        </button>
      </div>

      {/* TYPE TAB */}
      {activeTab === "type" && (
        <>
          <div className={styles["preview-box"]}>
            <p
              className={styles["preview-text"]}
              style={{
                fontFamily: fontMap[font],
                color,
                fontSize: `${size}px`,
              }}
            >
              {name}
            </p>
          </div>

          <div className={styles["form-grid"]}>
            <div className={styles["form-group"]}>
              <label className={styles["label"]}>Your Name</label>
              <input
                className={styles["input"]}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["label"]}>Font</label>
              <select
                className={styles["select"]}
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option>Dancing Script</option>
                <option>Great Vibes</option>
                <option>Pacifico</option>
                <option>Allura</option>
              </select>
            </div>
          </div>

          <div className={styles["color-size-row"]}>
            <div>
              <label className={styles["label"]}>Color</label>
              <div className={styles["color-options"]}>
                <span
                  className={styles["color-circle"]}
                  style={{ background: "#000" }}
                  onClick={() => setColor("#000")}
                />
                <span
                  className={styles["color-circle"]}
                  style={{ background: "#1d4ed8" }}
                  onClick={() => setColor("#1d4ed8")}
                />
                <span
                  className={styles["color-circle"]}
                  style={{ background: "#ef4444" }}
                  onClick={() => setColor("#ef4444")}
                />
              </div>
            </div>

            <div>
              <label className={styles["label"]}>Size</label>
              <input
                type="range"
                min="20"
                max="80"
                className={styles["slider"]}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* DRAW TAB */}
      {activeTab === "draw" && (
        <>
          <div className={styles["preview-box"]}>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              style={{ background: "#fff", borderRadius: "8px" }}
            ></canvas>
          </div>

          <button
            className={styles["save-btn"]}
            onClick={() => signaturePadRef.current.clear()}
          >
            Clear
          </button>
        </>
      )}

      {/* UPLOAD TAB */}
      {activeTab === "upload" && (
        <>
          <div className={styles["preview-box"]}>
            {uploadImage ? (
              <img
                src={uploadImage}
                className={styles["uploaded-img"]}
                alt="Uploaded Signature"
              />
            ) : (
              <p>Upload your signature image</p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className={styles["input"]}
            onChange={handleUpload}
          />
        </>
      )}

      {/* Save */}
      <button className={styles["save-btn"]} onClick={saveSignature}>
        Save Signature
      </button>
    </div>
  );
};

export default CreateSign;
