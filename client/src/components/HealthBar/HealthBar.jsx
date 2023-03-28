import React from "react";
import "./HealthBar.css";
export const HealthBar = (props) => {
  return (
    <div className="healthbar">
      <div
        className="dentrohealthbar"
        style={{ width: `${props.healthscore}%` }}
      >
        {props.healthscore}%
      </div>
    </div>
  );
};
