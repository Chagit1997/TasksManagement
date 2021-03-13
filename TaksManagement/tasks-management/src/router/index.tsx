import { Router, Route, Switch} from "react-router-dom";
import * as createHistory from "history";
import TasksManagement from "../components/TasksManagement";


// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
export const history = createHistory.createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={TasksManagement} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;