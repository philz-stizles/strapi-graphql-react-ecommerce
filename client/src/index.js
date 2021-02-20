import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'gestalt/dist/gestalt.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Checkout from './pages/Checkout';
import Brews from './pages/Brews';

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/:brandId" component={Brews} />
      </Switch>
    </React.Fragment>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
