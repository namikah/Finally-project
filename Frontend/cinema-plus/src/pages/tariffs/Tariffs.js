import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { cinemaService } from "../../API/services/cinemaService";
import Tariff from "../../components/tariff/Tariff";
import "./tariffs.scss";

function Tariffs() {
  const [cinemaData, setCinemaData] = useState();
  const [selectedCinemaId, setSelectedCinemaId] = useState(0);

  const getData = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = useCallback((e) => {
    document.getElementsByClassName("selected")[0].classList.remove("selected");
  }, []);

  return (
    <>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100">
            <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
              <Tab>TARIFLER</Tab>
            </TabList>
            <TabPanel className="another-films">
              <div className="header-filter d-flex flex-wrap justify-content-center align-items-center gap-2 gap-lg-5 gap-md-3">
                <ul className="cinemas-us col-md-7 text-center">
                  {cinemaData?.map(({ id, name }, index) => (
                    <li key={id}>
                      <Link
                        to={"#"}
                        className={index === 0 ? "selected" : ""}
                        onClick={(e) => {
                          handleChange();
                          e.target.classList.toggle("selected");
                          setSelectedCinemaId(id);
                        }}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
      <Tariff cinemaId={selectedCinemaId}/>
    </>
  );
}

export default Tariffs;
