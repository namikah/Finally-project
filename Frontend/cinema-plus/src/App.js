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
import { SessionProvider } from "./context/session/Session";

function App() {
  return (
    <>
      <LoadingProvider>
        <SessionProvider>
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
              <Redirect to={"/error"} />
            </Switch>
            <Footer />
        </SessionProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
