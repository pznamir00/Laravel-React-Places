import React, { useState, useEffect, useRef } from 'react';
import { getUser } from '../../api';
import { getToken } from '../../functions';
import {withRouter} from 'react-router'
import HamburgerMenu from 'react-hamburger-menu';
import './style.scss';


const Header = props => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const collapse = useRef();
    props.history.listen(() => setLoaded(false));

    useEffect(() => {
        let token = getToken();
        getUser(token).then(res => {
            setUser(res);
            setLoaded(true);
        });
    }, [loaded]);

    useEffect(() => {
        if(isOpen) collapse.current.classList.add('show');
        else collapse.current.classList.remove('show');
    }, [isOpen])

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ml-lg-5 pl-5" href="/">Logo</a>
                <HamburgerMenu
                    isOpen={isOpen}
                    menuClicked={() => setOpen(!isOpen)}
                    width={18}
                    height={15}
                    strokeWidth={4}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                    className="border-none mr-5 d-lg-none"
                />
                <div ref={collapse} className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="ml-auto mr-5 pr-5">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about-us">About Us</a>
                            </li>
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
                </div>
                </nav>
        </header>
    )
}





const Footer = () => {
    return(
        <footer>
            <div className="d-flex justify-content-around">
                <div className="mt-3">
                    <a href="/"><i className="fa fa-home mr-3"></i>Home</a>
                    <br/>
                    <a href="/contact"><i className="fa fa-envelope mr-3"></i>Contact</a>
                    <br/>
                    <a href="/about-us"><i className="fa fa-info mr-3 mb-4"></i>About us</a>
                </div>
                <div className="mt-2">
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-github"></i></a>
                </div>
            </div>
            <div className="copy">
                &copy; All rights reserved
            </div>
        </footer>
    )
}





export default withRouter(Header);
export { Footer }