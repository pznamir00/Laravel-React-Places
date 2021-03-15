import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { getToken } from '../../functions';


const Header = () => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        let token = getToken();
        getUser(token).then(res => {
            setUser(res);
            setLoaded(true);
        });
    }, []);

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {loaded &&
                            <React.Fragment>
                                {user &&
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/account">{user.name}</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/auth/logout">Logout</a>
                                        </li>
                                    </React.Fragment>
                                }
                                {!user &&
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/auth/login">Sign in</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/auth/register">Sign up</a>
                                        </li>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        }
                    </ul>
                </div>
                </nav>
        </header>
    )
}





const Footer = () => {
    return(
        <footer>
            &copy; All rights reserved
        </footer>
    )
}




export{
    Header,
    Footer
}