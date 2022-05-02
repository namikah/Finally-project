import React, { useCallback, useEffect, useState } from "react";
import { Table } from "reactstrap";
import { tariffService } from "../../API/services/tariffService";
import "./tariff.scss";

function Tariff({ cinemaId }) {
  const [tariffs, setTariffs] = useState([]);

  const getData = useCallback(() => {
    tariffService.getTariff().then((res) => {
      setTariffs(
        res.data?.filter((x) => x.cinemaId.toString() === cinemaId.toString())
      );
    });
  }, [cinemaId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div id="tariff">
      <div className="container">
        <div className="row">
          <div className="d-flex flex-column justify-content-between align-items-center">
            <h2 className="pt-5 pb-3">1-3 gunler</h2>
            <Table>
              <thead>
                <tr>
                  <th className="column-film">Seans</th>
                  <th className="column-session">Vaxt</th>
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 1 &&
                      x.endDayOfWeek === 3 &&
                      x.format.name.includes("2D")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 1 &&
                      x.endDayOfWeek === 3 &&
                      x.format.name.includes("Tur")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 1 &&
                      x.endDayOfWeek === 3 &&
                      x.format.name.includes("3D")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 1 &&
                    x.endDayOfWeek === 3 &&
                    x.name.includes("Seher")
                ) ? (
                  <tr>
                    <td className="column-cinema">Seher</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 1 &&
                            x.endDayOfWeek === 3 &&
                            x.name.includes("Seher")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 1 &&
                            x.endDayOfWeek === 3 &&
                            x.name.includes("Seher")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 1 &&
                    x.endDayOfWeek === 3 &&
                    x.name.includes("Gunorta")
                ) ? (
                  <tr>
                    <td className="column-cinema">Gunorta</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 1 &&
                            x.endDayOfWeek === 3 &&
                            x.name.includes("Gunorta")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 1 &&
                            x.endDayOfWeek === 3 &&
                            x.name.includes("Gunorta")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 1 &&
                    x.endDayOfWeek === 3 &&
                    x.name.includes("Axsam")
                ) ? (
                  <tr>
                    <td className="column-cinema">Axsam</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 1 &&
                            x.endDayOfWeek === 3 &&
                            x.name.includes("Axsam")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 1 &&
                            x.endDayOfWeek === 3 &&
                            x.name.includes("Axsam")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 1 &&
                        x.endDayOfWeek === 3 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 1 &&
                              x.endDayOfWeek === 3 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </Table>
            <h2 className="pt-5 pb-3">4-5 gunler</h2>
            <Table>
              <thead>
                <tr>
                  <th className="column-film">Seans</th>
                  <th className="column-session">Vaxt</th>
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 4 &&
                      x.endDayOfWeek === 5 &&
                      x.format.name.includes("2D")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 4 &&
                      x.endDayOfWeek === 5 &&
                      x.format.name.includes("Tur")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 4 &&
                      x.endDayOfWeek === 5 &&
                      x.format.name.includes("3D")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 4 &&
                    x.endDayOfWeek === 5 &&
                    x.name.includes("Seher")
                ) ? (
                  <tr>
                    <td className="column-cinema">Seher</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 4 &&
                            x.endDayOfWeek === 5 &&
                            x.name.includes("Seher")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 4 &&
                            x.endDayOfWeek === 5 &&
                            x.name.includes("Seher")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 4 &&
                    x.endDayOfWeek === 5 &&
                    x.name.includes("Gunorta")
                ) ? (
                  <tr>
                    <td className="column-cinema">Gunorta</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 4 &&
                            x.endDayOfWeek === 5 &&
                            x.name.includes("Gunorta")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 4 &&
                            x.endDayOfWeek === 5 &&
                            x.name.includes("Gunorta")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 4 &&
                    x.endDayOfWeek === 5 &&
                    x.name.includes("Axsam")
                ) ? (
                  <tr>
                    <td className="column-cinema">Axsam</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 4 &&
                            x.endDayOfWeek === 5 &&
                            x.name.includes("Axsam")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 4 &&
                            x.endDayOfWeek === 5 &&
                            x.name.includes("Axsam")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 4 &&
                        x.endDayOfWeek === 5 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 4 &&
                              x.endDayOfWeek === 5 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </Table>
            <h2 className="pt-5 pb-3">6-7 gunler (Bayram ve qeyri-is gunleri)</h2>
            <Table>
              <thead>
                <tr>
                  <th className="column-film">Seans</th>
                  <th className="column-session">Vaxt</th>
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 6 &&
                      x.endDayOfWeek === 7 &&
                      x.format.name.includes("2D")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 6 &&
                      x.endDayOfWeek === 7 &&
                      x.format.name.includes("Tur")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                  {tariffs?.some(
                    (x) =>
                      x.startDayOfWeek === 6 &&
                      x.endDayOfWeek === 7 &&
                      x.format.name.includes("3D")
                  ) ? (
                    <>
                      <th className="column-cinema">Format</th>
                      <th className="column-cinema">Price</th>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 6 &&
                    x.endDayOfWeek === 7 &&
                    x.name.includes("Seher")
                ) ? (
                  <tr>
                    <td className="column-cinema">Seher</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 6 &&
                            x.endDayOfWeek === 7 &&
                            x.name.includes("Seher")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 6 &&
                            x.endDayOfWeek === 7 &&
                            x.name.includes("Seher")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Seher") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 6 &&
                    x.endDayOfWeek === 7 &&
                    x.name.includes("Gunorta")
                ) ? (
                  <tr>
                    <td className="column-cinema">Gunorta</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 6 &&
                            x.endDayOfWeek === 7 &&
                            x.name.includes("Gunorta")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 6 &&
                            x.endDayOfWeek === 7 &&
                            x.name.includes("Gunorta")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Gunorta") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
                {tariffs?.some(
                  (x) =>
                    x.startDayOfWeek === 6 &&
                    x.endDayOfWeek === 7 &&
                    x.name.includes("Axsam")
                ) ? (
                  <tr>
                    <td className="column-cinema">Axsam</td>
                    <td className="column-cinema">
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 6 &&
                            x.endDayOfWeek === 7 &&
                            x.name.includes("Axsam")
                        )
                        .startTime.slice(0, 5)}
                      -
                      {tariffs
                        ?.find(
                          (x) =>
                            x.startDayOfWeek === 6 &&
                            x.endDayOfWeek === 7 &&
                            x.name.includes("Axsam")
                        )
                        .endTime.slice(0, 5)}
                    </td>
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("2D")
                    ) ? (
                      <>
                        <td className="column-cinema">2D</td>
                        <td className="column-cinema">
                          {" "}
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("2D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("Tur")
                    ) ? (
                      <>
                        <td className="column-cinema">Az/Tr</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("Tur")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                    {tariffs?.some(
                      (x) =>
                        x.startDayOfWeek === 6 &&
                        x.endDayOfWeek === 7 &&
                        x.format.name.includes("3D")
                    ) ? (
                      <>
                        <td className="column-cinema">3D</td>
                        <td className="column-cinema">
                          {tariffs?.find(
                            (x) =>
                              x.name.includes("Axsam") &&
                              x.startDayOfWeek === 6 &&
                              x.endDayOfWeek === 7 &&
                              x.format.name.includes("3D")
                          ).price + " AZN"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tariff;
