import React, { useState } from "react";
import "./progressBar.scss";
import ReactLoading from "react-loading";
import { useLoadingContext } from "../../context/loading";

function ProgressBar({ title }) {
    const [{progress, setProgress}] = useLoadingContext();

  return (
    <section id="progress">
      <div className="container">
        <div className="row">
          <div className="progress-body d-flex flex-column justify-content-center align-items-center">
            <p>{title}</p>
            <ReactLoading className="ReactLoading" type={'bubbles'} color={"#334e9e"} height={1} width={200} />
            <span onClick={()=>setProgress(false)} className="x-close d-flex justify-content-end align-items-top">x</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgressBar;
