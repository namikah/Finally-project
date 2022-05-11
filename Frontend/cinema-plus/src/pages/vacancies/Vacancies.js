import React from "react";
import "./vacancies.scss";

function Vacancies() {
  return (
    <section id="vacancies">
      <div className="container">
        <div className="row">
          <ul>
            <li>
              <h6>Vacancies</h6>
            </li>
            <li>
                <img className="img-fluid" src="https://res.cloudinary.com/cinemaplus/image/upload/v1652242836/sayt_3_in_1.1200x450_zs0b9q.jpg" alt="vacancies"></img>
            </li>
            <li>
                <p><strong>Express-barmen; iş yeri:</strong> CinemaPlus “Gənclik MALL”, “28 MALL”, “Azərbaycan”, “Dəniz Mall” kinoteatrları</p>
                <p><strong>Bilet nəzarətçisi; iş yeri:</strong> CinemaPlus “Gənclik MALL”, “28 MALL”, “Azərbaycan”, “Dəniz Mall” kinoteatrları</p>
                <br/>
                <p><strong>Kinomexanik; iş yeri:</strong> CinemaPlus “Gənclik MALL”, “28 MALL”, “Azərbaycan”, “Dəniz Mall” kinoteatrları</p>
                <br/>
                <p>CV-nizi zəhmət olmasa, karyera@cinemaplus.az elektron ünvanına göndərin. Xahiş olunur mailin mövzu hissəsində namizəd olduğunuz vəzifəni qeyd edəsiniz.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Vacancies;
