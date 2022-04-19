import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cinemaService } from "../../API/services/cinemaService";
import "./about.scss";

function About() {
  const [cinemaData, setCinemaData] = useState();

  const getData = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(cinemaData);
  return (
    <section id="about">
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="col-md-12 text-center pt-5 pb-3">"CinemaPlus"</h2>
          <ul className="about-us col-md-12">
            <li>
              <p>
                CinemaPlus şəbəkəsinə 9 kinoteatr, 50+ ekran və 5000+ oturacaq
                daxildir.
              </p>
            </li>
            <li>
              <p>
                Yüksək ölçülü 3D-kontentini nümayiş etdirmək imkanı olan
                rəqəmsal proyeksiya sistemi və yüksək keyfiyyətli kinoekranlar
                ilə təchiz olunub. Həmçinin, gücləndirilmiş parlaqlıq və
                “Enhanced 4K Barco” dəqiq təsvirinə malikdir. Bütün bunlar və
                başqa amillər kinofilmləri ən yaxşı keyfiyyətdə nümayiş etdirmək
                imkanı yaradır.
              </p>
            </li>
            <li>
              <p>
                “CinemaPlus” kinoteatrlar şəbəkəsinin tətbiq etdiyi “Platinum
                Movie Suites” konsepsiyası tamaşaçılara yüksək komfortlu,
                dəbdəbəli və dəridən hazırlanmış, söykənəcəyi tam arxaya açılan
                italyan və ispan kreslolarda film izləmək və kinoseans zamanı
                qida və içkiləri sifariş etmək imkanı yaradır.
              </p>
            </li>
            <li>
              <p>
                Həmçinin kinoteatrda, zalların yuxarı pillələrində yerləşən, 6
                nəfərdən 12 nəfərə kimi oturacaqları olan 6 şüşəli mini Skybox
                zalları var. Tamaşaçılar fərdi işıqlandırma və gadjetlərin şarj
                cihazı ilə təchiz olunmuş rahat oturacaqlarda film izləməkdən
                zövq ala biləcəklər. Hər bir Skybox zalına giriş lift ilə
                mümkündür.
              </p>
            </li>
            <li>
              <p>
                CinemaPlus şəbəkəsinə 9 kinoteatr, 50+ ekran və 5000+ oturacaq
                daxildir.
              </p>
            </li>
            <li>
              <p>
                Həmçinin, 4DX formatı ölkəmizdə yalnız “CinemaPlus”
                kinoteatrında tətbiq olunur. 4DX innovativ kinoteatr
                texnologiyası kəskin süjetli blokbasterləri və qorxu filmlərini
                hərəkət, fırlanma və kreslodan titrəyişlər, su damcıları və
                külək, ildırım və qar, sabun köpükləri və ətir kimi əlavə xüsusi
                effektlər ilə vizual effektlərini genişləndirir. Bunun
                nəticəsində 4DX, tamaşaçıları böyük ekranda baş verən hadisələrə
                sövq etməklə kino sənayesində ən valehedici formatlardan biri
                hesab olunur.
              </p>
            </li>
          </ul>
          <ul className="cinemas-us col-md-7 text-center">
            {cinemaData?.map(({ id, name }) => (
              <li key={id}>
                <Link to={""}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
