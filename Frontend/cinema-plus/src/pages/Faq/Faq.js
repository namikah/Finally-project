import React, { useCallback, useEffect, useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from "reactstrap";
import { faqService } from "../../API/services/faqService";
import "./faq.scss";

function Faq() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  const [faq, setFaq] = useState([]);

  const getData = useCallback(() => {
    faqService.getFaq().then((res) => {
      setFaq(res.data);
    });
  }, [setFaq]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100">
            <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
              <Tab>FAQ</Tab>
            </TabList>
          </Tabs>
        </div>
      </section>
      <section id="faq" className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div>
              <UncontrolledAccordion>
                {faq?.map((item) => (
                  <AccordionItem key={item.id}>
                    <AccordionHeader targetId={item.id}>
                     {item.question}
                    </AccordionHeader>
                    <AccordionBody accordionId={item.id}>
                    <div dangerouslySetInnerHTML={{__html: item.answer}}></div>
                    </AccordionBody>
                  </AccordionItem>
                ))}
              </UncontrolledAccordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
