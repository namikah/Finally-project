import React from "react";
import "./dolbyAtmos.scss";
function DolbyAtmos() {
  return (
    <div id="dolby-atmos">
      <div className="container">
        <div className="row">
          <div className="dolby-logo d-flex justify-content-center align items-center">
            <img
              src="https://www.cinemaplus.az/site/assets/files/1038/dolbywh.250x0.png"
              alt="dolby-atmos"
            ></img>
          </div>
          <div className="dolby-description">
            <h2 className="title">Səs effektləri yeni müstəvidə</h2>
            <p className="subtitle">
              Dolby Atmos səs effektlərini yeni müstəviyə çıxarır, bununla da
              izləyicilərə təkcə istiqaməti deyil, həm də səs mənbəyinin şaquli
              mövqeyini hiss etmək imkanı yaradır. Belədə yağışın səsi həqiqətən
              də tavandan gəlir, yaxınlaşan qatardan isə yer titrəyir.
              <br />
              Artıq səs kinozalın istənilən nöqtəsindən gəlir və bununla da baş
              verən hadisənin maksimum dərəcədə real təsvirini yaradır. Bu
              döyüş, fantastika və ya melodrama ola bilər. Odur ki, hazır olun
              sizi, heç vaxt eşitmədiyiniz kino gözləyir!
            </p>
          </div>
          <div className="dolby-trailer">
            <iframe
              title="dolby-atmos"
              allowFullScreen
              frameBorder={0}
              width={"100%"}
              height={600}
              src="https://www.youtube.com/embed/WBnXJ4JZ2vw?list=PLopk4AERRFh59EUwvsXnAk7owHK-_HVPZ&showinfo=0"
            ></iframe>
          </div>
          <div className="dolby-description">
            <h2 className="title">Dolby Atmos formatında ən yaxşı filmlər</h2>
            <p>
              Dolby, artıq uzun illərdi ki, hollivud studiyaları ilə tandemdə
              işləyir, onların dəstəyini alıb və öz yaradıcı məsələlərini həll
              etmək üçün yeni audio imkanlardan istifadə etməyin başlamağına
              razılıq əldə edib.
            </p>
            <p>
              Dolby Atmos dəstəyi ilə ilk film disney istehsalı olan “Cəsur
              ürəkli” 3D-cizgi filmi olmuşdur. Dolby Laboratories və Piter
              Ceksonun Park Road Post Production prodüser studiyası ilə çoxdan
              gözlənilən əməkdaşlıq anonsundan sonra 2013-cü ilin əsas
              premyerası “Hobbit: Qəfil səyahət” filmi Dolby Atmos formatında
              çıxmışdır. Bu format hesabına film daha da realistik səs müşayiəti
              əldə etmişdir və tamaşaçıları sanki özlərini Aralıq torpağında
              hiss etmək imkanı yaratmışdır.
            </p>
            <p>
              İndi artıq Hollivudda yaradılmış hər böyük filmi, Dolby Atmos
              hesabına yeni tərzdə baxmaq və eşitmək olar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DolbyAtmos;
