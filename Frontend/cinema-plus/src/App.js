import "./App.css";
import { Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Redirect to={"/error"} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
