import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loadercontainer">
      <div className="contentloader">
        <h1 className="cargando">CARGANDO</h1>
        <span className="loader"></span>
      </div>
    </div>
  );
}
