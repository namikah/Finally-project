import React, { useCallback, useEffect, useState } from "react";
import { cinemaService } from "../../API/services/cinemaService";
import "./contact.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { messageService } from "../../API/services/messageService";
import { useLoadingContext } from "../../context/loading";
import ProgressBar from "../progress/ProgressBar";
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
  const { push } = useHistory();

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
      toast.error("zəhmət olmasa, xanaları düzgün doldurun !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    messageService
      .postMessage(message)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Message göndərildi. Təşəkkür edirik...", {
            position: toast.POSITION.TOP_CENTER,
          });
          push({
            pathname: "/contact",
          });
        } else
          toast.info("Səhv baş verdi !", {
            position: toast.POSITION.TOP_CENTER,
          });
      })
      .catch(() => {
        toast.info("Səhv baş verdi !", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, [message, push]);

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
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                // title="unique"
                width="100%"
                height="650"
                id="gmap_canvas"
                src={cinema.mapUrl}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
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
        <div className="col-3">
          <div>
            <h2 className="text-center">Bize yazin</h2>
          </div>
          <Form className="text-center">
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
            <ToastContainer autoClose={3000} />
          </Form>
        </div>
      </section>
    </section>
  );
}

export default ContactComponent;
