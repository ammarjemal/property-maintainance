import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/Dashboard";
import ServiceManagementPage from "./pages/ServiceManagement";
import CustomerSupportPage from "./pages/CustomerSupport";
import PaymentsPage from "./pages/Payments";
import AdvertismentsPage from "./pages/Advertisments";
import DashboardLayout from "./components/Layout/DashboardLayout";
import SocketHome from "./components/Socket/Home";
import SocketChatPage from "./components/Socket/ChatPage";
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:5000")
function App() {
  console.log(socket);
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <DashboardLayout>
            <DashboardPage/>
          </DashboardLayout>
        </Route>
        <Route path='/management'>
          <Layout title="Service Management">
            <ServiceManagementPage/>
          </Layout>
        </Route>
        <Route path='/support'>
          <Layout title="Customer Support">
            <CustomerSupportPage socket={socket}/>
          </Layout>
        </Route>
        <Route path='/socket' exact>
          <SocketHome socket={socket}/>
        </Route>
        <Route path='/socket/chat'>
          <SocketChatPage socket={socket}/>
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
