import React from "react";
import style from "./Card.module.css";
export const Card = ({
  imgSrc,
  imgAlt,
  nomVulgar,
  nomCientifico,
  onViewMore,
}) => {
  return (
    <div className={style.cardContainer}>
      {imgSrc && (
        <div className={style.imgContainer}>
          <div className={style.imgOverlay}>
            <button onClick={onViewMore} className={style.boton}>
              Ver más
            </button>
          </div>
          <img src={imgSrc} alt={imgAlt} className={style.cardImg}></img>
        </div>
      )}
      <p className={style.cardDescripcion}>
        {nomVulgar && <span className={style.nombreVulgar}>{nomVulgar}</span>}
        <br></br>
        {nomCientifico && (
          <span className={style.nombreCientifico}>
            <i>{nomCientifico}</i>
          </span>
        )}
      </p>
    </div>
  );
};
