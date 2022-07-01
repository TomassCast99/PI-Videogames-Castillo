import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import "./Details.css";

export default function Detail() {
  const { id } = useParams();
  const gameDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  console.log(gameDetail);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resState());
    };
  }, [dispatch, id]);

  return (
    <div>
      {Object.keys(gameDetail).length > 0 ? (
        <div className="paginado2">
          <div>
            <Link to="/home">
              <button className="botonDetails" onClick={resState}>
                Home
              </button>
            </Link>
          </div>
          <div>
            <img
              className="imagdetalle"
              src={gameDetail.background_image}
              alt={gameDetail.name}
              width="450px"
              height="450px"
            />
          </div>

          <div className="cardDetalle">
            <div>
              <h1>{gameDetail.name}</h1>
            </div>
            <div className="base3">
              <h4>Genres:</h4>
              <p>{gameDetail.genres}</p>
            </div>
            <div className="base3">
              <h4>Rating:</h4>
              <p>{gameDetail.rating}</p>
            </div>
            <div className="base3">
              <h4>Released:</h4>
              <p>{gameDetail.released}</p>
            </div>
            <div className="base3">
              <h4>Platforms:</h4>
              {gameDetail.platforms ? (
                <ul>{gameDetail.platforms.join(" - ").split("")}</ul>
              ) : (
                <ul>{gameDetail.platform.join(" - ").split("")}</ul>
              )}
            </div>
            <div className="base">
              <h4>Description:</h4>
              <p>{gameDetail.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
