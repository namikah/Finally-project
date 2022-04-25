import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Movie from "../movie/Movie";
import Session from "../session/Session";
import "./tabHeader.scss";

function TabHeader() {
  return (
    <section id="tab-header">
      <div className="d-flex justify-content-center align-itmes-center gap-1">
        <Tabs className="w-100">
          <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
            <Tab>BU GÜN</Tab>
            <Tab>CƏDVƏL</Tab>
            <Tab>TEZLİKLƏ</Tab>
          </TabList>
          <TabPanel>
            <Movie defaultPerPage={8}/>
          </TabPanel>
          <TabPanel>
            <Session />
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
}

export default TabHeader;
