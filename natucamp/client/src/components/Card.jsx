import React from "react";
import "./Card.css";
export const Card = ({ imgSrc, imgAlt, nomVulgar, nomCientifico, link }) => {
  return (
    <div className="card-container">
      {imgSrc && (
        <div className="img-container">
          <div className="img-overlay">
            <button onClick={() => window.open({ link })} className="boton">
              Ver más
            </button>
          </div>
          <img src={imgSrc} alt={imgAlt} className="card-img"></img>
        </div>
      )}
      <p className="card-descripcion">
        {nomVulgar && <span className="nombre-vulgar">{nomVulgar}</span>}
        <br></br>
        {nomCientifico && (
          <span className="nombre-cientifico">
            <i>{nomCientifico}</i>
          </span>
        )}
      </p>
    </div>
  );
};
