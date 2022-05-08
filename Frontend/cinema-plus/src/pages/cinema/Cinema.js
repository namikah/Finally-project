import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { cinemaService } from "../../API/services/cinemaService";
import Banner from "../../components/layouts/banner/Banner";
import Session from "../../components/session/Session";
import "./cinema.scss";

function Cinema() {
  const { search } = useLocation();
  const {push} = useHistory();
  const params = new URLSearchParams(search);
  const [cinema, setCinema] = useState({});
  const [cinemas, setCinemas] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const cinemaId = params.get("id");

  const getData = useCallback((id) => {
    cinemaService.getCinema(id).then((res) => {
      setCinema(res.data);
    });
  }, []);

  useEffect(() => {
    getData(cinemaId);
  }, [getData, cinemaId]);

  const getDatas = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemas(res.data);
    });
  }, []);

  useEffect(() => {
    getDatas();
  }, [getDatas]);

  const getTabIndex = useCallback(() => {
    setTabIndex(cinemas?.findIndex(item => item.id.toString() === cinemaId.toString()))
  }, [cinemas,cinemaId]);

  useEffect(() => {
    getTabIndex();
  }, [getTabIndex]);

  return (
    <>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100" selectedIndex={tabIndex}  onSelect={""} >
            <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
              {cinemas?.map((item,index) => (
                <Tab data-index={index} key={item.id} onClick={()=> push(`/cinema?id=${item.id}`)}>{item.name}</Tab>
              ))}
            </TabList>
            {cinemas?.map((item) => (
              <TabPanel key={item.id}>
                 <Banner cinema={item} />
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
            <Tab>SEKILLER</Tab>
            <Tab>TARIFLER</Tab>
            <Tab>ELAQE</Tab>
          </TabList>
          <TabPanel>
          <Session selectedCinemaId={cinemaId}/>
          </TabPanel>
          <TabPanel>
           <div>SEKILLER</div>
          </TabPanel>
          <TabPanel>
          <div>TARIFLER</div>
          </TabPanel>
          <TabPanel>
          <div>ELAQE</div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
    </>
  );
}

export default Cinema;
