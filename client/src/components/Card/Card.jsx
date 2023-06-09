import React from "react";
import { Link } from "react-router-dom";
import { HealthBar } from "../HealthBar/HealthBar";
import "./Card.css";

export default function Card({ image, name, diets, id, healthscore }) {
  return (
    <div className="card">
      <Link to={`/home/${id}`}>
        <img
          src={image}
          alt="img not found"
          width="350px"
          height="250px"
          className="imagecard"
        />
      </Link>
      <div className="cardcontent">
        <h3 className="cardtitle">{name}</h3>
        <h5 className="carddescr">TIPO DE DIETA: {(diets || []).join(", ")}</h5>
        <h5 className="carddescr">
          HEALTH SCORE: <HealthBar healthscore={healthscore} />
        </h5>
      </div>
    </div>
  );
}
