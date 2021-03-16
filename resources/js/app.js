require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GuestRoute, LoggedRoute } from './middlewares';
import { Header, Footer } from './components/Layout';
import { Login, Register, PasswordReset, PasswordForgot, Logout } from './components/Auth';
import Contact from './components/Pages/Contact';
import AboutUs from './components/Pages/AboutUs';
import Home from './components/Pages/Home';
import OnePlace from './components/Pages/OnePlace';
import Account from './components/Logged/Account';
import Error404 from './components/Errors/404';
import { AddPlace, EditPlace } from './components/PlaceHandles';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import 'react-notifications/lib/notifications.css';


const App = () => {
    return (
      <React.Fragment>
          <Header/>
          <NotificationContainer/>
          <Switch>                
                {/* GUEST */}
                <GuestRoute path='/auth/login' component={Login} />
                <GuestRoute path='/auth/register' component={Register} />
                <GuestRoute path='/auth/password/forgot' component={PasswordForgot} />
                <GuestRoute path='/auth/password/reset/:token' component={PasswordReset} />

                {/* LOGGED */}
                <LoggedRoute path='/account' component={Account} />
                <LoggedRoute path='/auth/logout' component={Logout} />
                <LoggedRoute path='/places/management/add' component={AddPlace} />
                <LoggedRoute path='/places/management/edit/:slug' component={EditPlace} />

                {/* PAGES */}
                <Route exact path='/' component={Home} />
                <Route path='/places/:slug' component={OnePlace} />
                <Route path='/contact' component={Contact} />
                <Route path='/about-us' component={AboutUs} />

                {/* 404 */}
                <Route component={Error404} />
          </Switch>
          <Footer/>
      </React.Fragment>
    );
}



ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
