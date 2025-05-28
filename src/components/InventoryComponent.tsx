import React from "react";
import "./InventoryComponent.css";

const InventoryProvider: React.FC = () => {
  return (
    <div className="container">
      <div className="icon-container">
        <h2>📦</h2>
      </div>
      <h1 className="title">Fiap Farm Inventory</h1>
    </div>
  );
};

export default InventoryProvider;
