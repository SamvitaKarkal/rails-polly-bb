import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { either, isEmpty, isNil } from "ramda";

import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import EditPoll from "components/Polls/EditPoll";
import ShowPoll from "components/Polls/ShowPoll";
import PageLoader from "components/PageLoader";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/polls/:slug/show"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={ShowPoll}
        />
        <PrivateRoute
          path="/polls/create"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={CreatePoll}
        />
        <PrivateRoute
          path="/polls/:slug/edit"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={EditPoll}
        />
      </Switch>
    </Router>
  );
};

export default App;
