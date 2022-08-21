import NoMatch from "../../pages/NoMatch";
import Home from "../../pages/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import { useWebsiteContext } from "../../contexts/WebsiteProvider";
import Dashboard from "../../pages/Dashboard";

const HOME_PAGE_PATH = "/";
const DASHBORAD_PAGE_PATH = "/dashboard";
const Routers = () => {
  const { currentWebsite } = useWebsiteContext();
  return (
    <Switch>
      <Route exact path={HOME_PAGE_PATH}>
        <Home />
      </Route>
      <Route exact path={DASHBORAD_PAGE_PATH}>
        {currentWebsite ? <Dashboard /> : <Redirect to={HOME_PAGE_PATH} />}
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
export default Routers;
