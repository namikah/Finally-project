import React, { useCallback, useEffect, useState } from "react";
import { cinemaService } from "../../API/services/cinemaService";
import "./contact.scss";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { messageService } from "../../API/services/messageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const messageDto = {
  name: "",
  email: "",
  title: "",
  body: "",
};

function ContactComponent({ cinemaId }) {
  const [cinema, setCinema] = useState({});
  const [sendMail, setSendMail] = useState(false);
  const [message, setMessage] = useState(messageDto);

  const getData = useCallback((id) => {
    cinemaService.getCinemaById(id).then((res) => {
      setCinema(res.data);
    });
  }, []);

  useEffect(() => {
    getData(cinemaId);
  }, [getData, cinemaId]);

  const sendMessage = useCallback(() => {
    if (
      message.name === "" ||
      message.email === "" ||
      message.body === "" ||
      message.title === ""
    ) {
      toast.info("zəhmət olmasa, xanaları düzgün doldurun !");
      return;
    }

    messageService
      .postMessage(message)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Mesajınız göndərildi. Təşəkkür edirik...");
       setTimeout(() => {
         document.querySelector("#send-mail-us").style.display="none";
       }, 5000);
        } else
          toast.error("Səhv baş verdi !");
      })
      .catch(() => {
        toast.error("Səhv baş verdi !");
      });
  }, [message]);

  const createMessage = () => {
    sendMessage();
  };

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  return (
    <section id="contact-cinema">
      <div className="row">
        <div className="col-md-6 left-side">
          <ul>
            <li>
              <span>Bizim ünvan:</span>
              <p>{cinema.address}</p>
            </li>
            <li>
              <span>Telefon:</span>
              <p>{cinema.mobile}</p>
            </li>
            <li>
              <span>Elektron ünvan:</span>
              <p>{cinema.email}</p>
            </li>
            <li>
              <span>Marketinq şöbəsi:</span>
              <p>{cinema.marketingMail}</p>
            </li>
            <li>
              <span>İş saatı:</span>
              <p>{cinema.workTime}</p>
            </li>
            <li className="write-us">
              <div
                className="btn btn-primary"
                onClick={() => setSendMail(!sendMail)}
              >
                Bizə yazın
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-6 right-side">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                title="unique"
                width="100%"
                height="650"
                id="gmap_canvas"
                src={cinema.mapUrl}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <section
        style={sendMail ? { display: "flex" } : { display: "none" }}
        onClick={(e) =>
          e.target.classList.contains("background-side") &&
          setSendMail(!sendMail)
        }
        id="send-mail-us"
        className="background-side row justify-content-center align-items.center"
      >
          <Form className="text-center col-3">
          <ToastContainer
              autoClose={3000}
              position="top-center"
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
            />
            <h2 className="text-center">Bize yazin</h2>
            <FormGroup>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="adınız"
                onChange={getElementValues}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="elektron poçt"
                onChange={getElementValues}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="mətn başlığı"
                onChange={getElementValues}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="body"
                id="body"
                placeholder="mətn"
                onChange={getElementValues}
              />
            </FormGroup>
            <Button
              className="btn"
              id="animate.css"
              onClick={() => {
                createMessage();
              }}
            >
              Gonder
            </Button>
          </Form>
      </section>
    </section>
  );
}

export default ContactComponent;
