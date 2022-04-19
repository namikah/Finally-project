import "./App.css";
import { Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import About from "./pages/about/About";
import CineBonus from "./pages/cineBonus/CineBonus";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/about"} exact component={About} />
        <Route path={"/cinebonus"} exact component={CineBonus} />
        <Redirect to={"/error"} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
