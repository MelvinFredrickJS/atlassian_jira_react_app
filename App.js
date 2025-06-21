import React, { useState, useRef } from "react";
import "./App.css";
import MainPanel from "./components/MainPanel";
import AddAccountModal from "./components/AddAccountModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  // Create a reference to call MainPanel's refresh method
  const mainPanelRef = useRef();

  const handleAccountAdded = () => {
    if (mainPanelRef.current) {
      mainPanelRef.current.refreshAccounts(); // Trigger data reload
    }
    setShowModal(false); // Close modal
  };

  return (
    <div className="app-container">
      <MainPanel ref={mainPanelRef} onAddAccount={() => setShowModal(true)} />
      {showModal && (
        <AddAccountModal
          onClose={() => setShowModal(false)}
          onAccountAdded={handleAccountAdded}
        />
      )}
    </div>
  );
}

export default App;
