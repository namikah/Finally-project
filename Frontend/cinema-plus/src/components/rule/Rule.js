import React, { useCallback, useEffect, useState } from "react";
import { ruleService } from "../../API/services/ruleService";
import "./rule.scss";

function Rules() {
  const [rules, setrules] = useState([]);

  const getData = useCallback(() => {
    ruleService.getRule().then((res) => {
      setrules(res.data);
    });
  }, [setrules]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section id="rule">
      <div className="container">
        <div className="row">
          <div className="rules d-flex flex-column justify-content-start align-items-start">
            {rules
              ?.filter((x) => x.isMain)
              ?.map((parent,index) => (
                <>
                 <div key={parent.id} dangerouslySetInnerHTML={{__html: parent.subtitle}} style={index ===0 ? {borderBottom:"1px solid black"} : {}} ></div>
                  {rules
                    ?.filter((x) => x.parentId === parent.id)
                    .map((children) => (
                      <div key={children.id} dangerouslySetInnerHTML={{__html: children.subtitle}}></div>
                    ))}
                </>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rules;
