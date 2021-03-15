import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from '../api';


const GuestRoute = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
    const [isLogged, setIsLogged] = useState(null)
    useEffect(() => {
        let token = window.localStorage.getItem('access_token'); 
        (async() => await getUser(token).then(res => { setIsLogged(Boolean(res)); setLoaded(true); }))() 
    }, []);
    if(!loaded) return null;
    return(
        <Route
            {...rest}
            render={props =>
              isLogged ? (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
              ) : (
                <Component {...props} />
              )
            }
        />
    )
}


const LoggedRoute = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
    const [isLogged, setIsLogged] = useState(null)
    useEffect(() => { 
        let token = window.localStorage.getItem('access_token'); 
        (async() => await getUser(token).then(res => { setIsLogged(Boolean(res)); setLoaded(true); }))() 
    }, []);
    if(!loaded) return null;
    return(
        <Route
            {...rest}
            render={props =>
              isLogged ? (
                <Component {...props} />
              ) : (
                <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
              )
            }
        />
    )
}


export {
    GuestRoute,
    LoggedRoute
}