import './App.css';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './Login';
import Users from './Users';
import EditUser from './EditUser';
import AddUser from './AddUser';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => <Login />} />
      </Switch>
      <Switch>
        <Route exact path="/users" render={props => <Users />} />
      </Switch>
      <Switch>
        <Route exact path="/user/edit/:id" render={props => <EditUser />} />
      </Switch>
      <Switch>
        <Route exact path="/user/add" render={props => <AddUser />} />
      </Switch>
    </Router>
  );
}

export default App;
