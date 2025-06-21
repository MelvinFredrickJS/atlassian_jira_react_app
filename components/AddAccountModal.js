import React, { useState } from "react";
import { invoke } from "@forge/bridge";
import "./AddAccountModal.css";



function AddAccountModal({ onClose, initialData = {} }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [errorMessage, setErrorMessage]= useState("");
  const [formData, setFormData] = useState({
    accountName: "",
    region: "",
    accessKey: "",
    secretKey: "",
    curUri: "",
    outputUri: "",
    ...(initialData||{}), // this will override defaults with passed-in values
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) setErrorMessage("");
  };
const handleSave = async () => {
  const requiredFields = [
    "accountName",
    "region",
    "accessKey",
    "secretKey",
    "curUri",
    "outputUri",
  ];

  for (const field of requiredFields) {
    if (!formData[field]?.trim()) {
      setErrorMessage(`Please fill in the "${field}" field.`);
      return;
    }
  }

  // Clear any previous error
  setErrorMessage("");

  try {
    await invoke("storedFormData", { data: formData });
    onClose();
  } catch (err) {
    setErrorMessage("Something went wrong while saving. Please try again.");
    console.error(err);
  }
};

  return (
<div className="modal-overlay">
  <div className="modal-content">
    <h2>Add Account</h2>

    <div className="form-row">
      <div className="form-group">
        <label>Account Name *</label>
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          placeholder="AWS Dev"
          required
        />
      </div>
      <div className="form-group">
        <label>Region *</label>
        <input
          type="text"
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="us-east-1"
          required
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Access Key *</label>
        <div className="input-wrapper">
          <input
          type= "password"
          name="accessKey"
          value={formData.accessKey}
          onChange={handleChange}
          placeholder="XXXXXXXXXXXXXXXXXX"
          required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Secret Key *</label>
        <div className="input-wrapper">
          <input
          type="password"
          name="secretKey"
          value={formData.secretKey}
          onChange={handleChange}
          placeholder="XXXXXXXXXXXXXXXXXX"
          required
          />
        </div>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>CUR S3 bucket URI *</label>
        <input
          type="text"
          name="curUri"
          value={formData.curUri}
          onChange={handleChange}
          placeholder="s3://random-billing-data-789/cur/"
          required
        />
      </div>
      <div className="form-group">
        <label>Output S3 bucket URI *</label>
        <input
          type="text"
          name="outputUri"
          value={formData.outputUri}
          onChange={handleChange}
          placeholder="s3://processed-results-456/output/"
          required
        />
      </div>
    </div>

    <div className="form-note">
      (e.g., https://mycurreport.s3.us-east-1.amazonaws.com/...)
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
        <div className="modal-buttons">
      {showDeleteConfirm ? (
        <div className="delete-confirm-group">
          <label>
            Type "<strong>{formData.accountName}</strong>" to confirm deletion:
          </label>
          <input
            type="text"
            value={deleteConfirmInput}
            onChange={(e) => {
              setDeleteConfirmInput(e.target.value);
              setDeleteError("");
            }}
            placeholder={`Enter "${formData.accountName}"`}
          />
          {deleteError && <div className="error-message">{deleteError}</div>}
          <div className="button-group">
            <button
              className="confirm-delete"
              onClick={async () => {
                if (deleteConfirmInput === formData.accountName) {
                  try {
                    await invoke("deleteAccount", {
                      accountName: formData.accountName,
                    });
                    onClose();
                  } catch (err) {
                    setDeleteError("Failed to delete account.");
                    console.error(err);
                  }
                } else {
                  setDeleteError("Account name doesn't match.");
                }
              }}
            >
              Confirm Delete
            </button>
            <button
              className="cancel"
              onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteConfirmInput("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {formData.accountName && (
            <button
              className="delete"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </button>
          )}
          <button className="save" onClick={() => handleSave(formData)}>
            Save
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </>
      )}
    </div>
  </div>
</div>
  );
}

export default AddAccountModal;
