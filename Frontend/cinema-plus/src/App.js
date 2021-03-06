import "./App.css";
import { Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import About from "./pages/about/About";
import CineBonus from "./pages/cineBonus/CineBonus";
import Services from "./pages/services/Services";
import Platinum from "./pages/platinum/Platinum";
import DolbyAtmos from "./pages/dolbyAtmos/DolbyAtmos";
import NewsDetail from "./pages/newsDetail/NewsDetail";
import AllNews from "./pages/news/AllNews";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import { LoadingProvider } from "./context/loading";
import Tariffs from "./pages/tariffs/Tariffs";
import { ConstantProvider } from "./context/constant";
import Cinema from "./pages/cinema/Cinema";
import Campaigns from "./pages/campaigns/Campaigns";
import Error from "./pages/error/Error";
import Contact from "./pages/contact/Contact";
import Rules from "./components/rule/Rule";
import Faq from "./pages/Faq/Faq";
import Vacancies from "./pages/vacancies/Vacancies";

function App() {
  return (
    <>
      <LoadingProvider>
        <ConstantProvider>
          <Header />
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/moviedetail"} exact component={MovieDetail} />
            <Route path={"/platinum"} exact component={Platinum} />
            <Route path={"/dolbyatmos"} exact component={DolbyAtmos} />
            <Route path={"/about"} exact component={About} />
            <Route path={"/services"} exact component={Services} />
            <Route path={"/cinebonus"} exact component={CineBonus} />
            <Route path={"/newsdetail"} exact component={NewsDetail} />
            <Route path={"/allnews"} exact component={AllNews} />
            <Route path={"/tariffs"} exact component={Tariffs} />
            <Route path={"/cinema"} exact component={Cinema} />
            <Route path={"/campaigns"} exact component={Campaigns} />
            <Route path={"/contact"} exact component={Contact} />
            <Route path={"/rules"} exact component={Rules} />
            <Route path={"/faq"} exact component={Faq} />
            <Route path={"/vacancies"} exact component={Vacancies} />
            <Route path={"/error"} exact component={Error} />
            <Redirect to={"/error"}  exact component={Error}/>
          </Switch>
          <Footer />
        </ConstantProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
