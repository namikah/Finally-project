import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { cinemaService } from "../../API/services/cinemaService";
import CinemaImages from "../../components/cinemaImages/CinemaImages";
import ContactComponent from "../../components/contact/ContactComponent";
import Banner from "../../components/layouts/banner/Banner";
import Session from "../../components/session/Session";
import Tariff from "../../components/tariff/Tariff";
import "./cinema.scss";

function Cinema() {
  const { search } = useLocation();
  const { push } = useHistory();
  const params = new URLSearchParams(search);
  const [cinema, setCinema] = useState({});
  const [cinemas, setCinemas] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const cinemaId = params.get("id");
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
  const getDatas = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemas(res.data);
    });
  }, []);

  useEffect(() => {
    getDatas();
  }, [getDatas]);
  
  const getData = useCallback((id) => {
    cinemaService.getCinemaById(id).then((res) => {
      setCinema(res.data);
    });
  }, []);

  useEffect(() => {
    getData(cinemaId);
  }, [getData, cinemaId]);



  const getTabIndex = useCallback(() => {
    setTabIndex(
      cinemas?.findIndex((item) => item.id.toString() === cinemaId.toString())
    );
  }, [cinemas, cinemaId]);

  useEffect(() => {
    getTabIndex();
  }, [getTabIndex]);

  return (
    <>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100" selectedIndex={tabIndex} onSelect={""}>
            <TabList className="bottom-bordered d-flex flex-wrap justify-content-center align-items-center gap-1">
              {cinemas?.map((item, index) => (
                <Tab
                  data-index={index}
                  key={item.id}
                  onClick={() => push(`/cinema?id=${item.id}`)}
                >
                  {item.name}
                </Tab>
              ))}
            </TabList>
            {cinemas?.map((item) => (
              <TabPanel key={item.id}>
                <Banner cinema={cinema} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </section>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100">
            <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
              <Tab>CƏDVƏL</Tab>
              <Tab>ŞƏKİLLƏR</Tab>
              <Tab>TARİFLƏR</Tab>
              <Tab>ƏLAQƏ</Tab>
            </TabList>
            <TabPanel>
              <Session selectedCinemaId={cinemaId} />
            </TabPanel>
            <TabPanel>
              <CinemaImages cinema={cinema} />
            </TabPanel>
            <TabPanel>
              <Tariff cinema={cinema} />
            </TabPanel>
            <TabPanel>
              <ContactComponent cinemaId={cinemaId} />
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default Cinema;
