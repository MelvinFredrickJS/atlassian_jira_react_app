import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import AddAccountModal from "./AddAccountModal"; // make sure this is correctly imported
import "./MainPanel.css";

function MainPanel() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Fetch stored accounts from Forge storage
  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await invoke("getstoredFormData");
      if (Array.isArray(data)) {
        setAccounts(data);
      } else if (data) {
        setAccounts([data]); // fallback for earlier single object format
      }
    };

    fetchAccounts();
  }, [showModal]); // refresh list after modal closes (on add/edit)

  // Open modal with selected account for editing
  const handleAccountClick = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  // Open modal for new account
  const handleAddClick = () => {
    setSelectedAccount(null);
    setShowModal(true);
  };

  return (
    <div className="main-panel">
      <div className="connections-header">
        <div className="sub-title">Connections</div>
        <button className="add-button" onClick={handleAddClick}>
          Add account
        </button>
      </div>


      <div className="sub-description">
        Connections that are linked to Jira Project
      </div>
    <div className="no-account-banner">
      {accounts.length === 0 ? (
        <div className="no-acc-text">No account is added</div>
      ) : (
        <div className="account-list">
          {accounts.map((account, index) => (
            <button
              key={index}
              className="account-button"
              onClick={() => handleAccountClick(account)}
            >
              {account.accountName}
            </button>
          ))}
        </div>
      )}
    </div>

      <div className="sub-section">
        <div className="sub-title">Cost Tracker</div>
        <div className="sub-description">AWS Cost and Usage Data</div>
      </div>

      {/* Modal rendering */}
      {showModal && (
        <AddAccountModal
          onClose={() => {
            setShowModal(false);
            setSelectedAccount(null);
          }}
          initialData={selectedAccount}
        />
      )}
    </div>
  );
}

export default MainPanel;
