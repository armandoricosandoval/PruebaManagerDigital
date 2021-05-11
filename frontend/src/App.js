import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientList from "./components/ClientList";
import CreateClient from "./components/CreateClient";
import EditClient from "./components/EditClient";
import Navbar from "./components/Navbar";
import NotPages from "./components/NotPages";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ClientList} />
        <Route exact path="/create" component={CreateClient} />
        <Route exact path="/edit/:id" component={EditClient} />
        <Route path="*" component={NotPages} />
      </Switch>
    </Router>
  );
};

export default App;
