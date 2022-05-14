import React, { useCallback, useEffect, useState } from "react";
import { dolbyAtmosService } from "../../API/services/dolbyAtmos";
import "./dolbyAtmos.scss";
function DolbyAtmos() {
  const [dolbyAtmos, setDolbyAtmos] = useState([]);

  const getData = useCallback(() => {
    dolbyAtmosService.getDolbyAtmos().then((res) => {
      setDolbyAtmos(res.data);
    });
  }, [setDolbyAtmos]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div id="dolby-atmos">
      <div className="container">
        <div className="row">
          <div className="dolby-logo d-flex justify-content-center align items-center">
            <img
              src="https://res.cloudinary.com/cinemaplus/image/upload/v1652562280/dolbywh.250x0_lqfome.png"
              alt="dolby-atmos"
            ></img>
          </div>
          {dolbyAtmos?.map((item) => (
            <>
              {" "}
              <div
                className="dolby-description"
                dangerouslySetInnerHTML={{ __html: item.title + item.subTitle }}
              ></div>
              {item.url && (
                <div className="dolby-trailer">
                  <iframe
                    title="dolby-atmos"
                    allowFullScreen
                    frameBorder={0}
                    width={"100%"}
                    height={600}
                    src={item.url}
                  ></iframe>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DolbyAtmos;
