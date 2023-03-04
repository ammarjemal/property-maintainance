import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainDashboardPage from "./pages/MainDashboard";
import ServiceManagementPage from "./pages/ServiceManagement";
import SecurityPage from "./pages/Security";
import CustomerSupportPage from "./pages/CustomerSupport";
import PaymentsPage from "./pages/Payments";
import AdvertismentsPage from "./pages/Advertisments";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Layout title="">
            <MainDashboardPage/>
          </Layout>
        </Route>
        <Route path='/management'>
          <Layout title="Service Management">
            <ServiceManagementPage/>
          </Layout>
        </Route>
        <Route path='/security'>
          <Layout title="Security">
            <SecurityPage/>
          </Layout>
        </Route>
        <Route path='/support'>
          <Layout title="Customer Support">
            <CustomerSupportPage/>
          </Layout>
        </Route>
        <Route path='/payments'>
          <Layout title="Payments and Transactions">
            <PaymentsPage/>
          </Layout>
        </Route>
        <Route path='/advertisments'>
          <Layout title="Advertisments">
            <AdvertismentsPage/>
          </Layout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
