import {BrowserRouter as Router, Switch,  Route} from "react-router-dom";

import Layout             from './Layout/Layout';
import Dashboard          from './Dashboard/Dashboard';
import Subscription       from './Subscription/Subscription';
import Builder            from './Builder/Builder';
import CreateSchedule     from './Schedule/CreateSchedule';
import Schedule           from './Schedule/Schedule';
import Analytics          from './Analytics/Analytics';
import AnalyticsDetails   from './Analytics/AnalyticsDetails';
import Report             from './Builder/Report';
import Login              from './Login/Login';

function App() {
  return (
    <Router>
        <Switch>
        <Route path="/login" component={Login}></Route>
          <Layout>
              <Route exact path="/dashboard" component={Dashboard}></Route>
              <Route path="/subscription" component={Subscription}></Route>
              <Route path="/builder" component={Builder}></Route>
              <Route path="/schedule/" component={Schedule}></Route>   
              <Route path="/create-schedule/:id" component={CreateSchedule}></Route>      
              <Route path="/analytics" component={Analytics}></Route>     
              <Route path="/analytics-details/:id" component={AnalyticsDetails}></Route>              
              <Route path="/generated" component={Report}></Route>                
          </Layout>
        </Switch>
    </Router>
  );
}

export default App;
