import React, { useState, useEffect, useRef } from 'react';
import { getUser } from '../../api';
import { getToken } from '../../functions';
import {withRouter} from 'react-router'
import HamburgerMenu from 'react-hamburger-menu';
import { Link } from 'react-router-dom';
import './style.scss';
import $ from 'jquery';


const Header = props => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const collapse = useRef();
    props.history.listen(() => {
        setLoaded(false);
        setOpen(false);

    });

    useEffect(() => {
        let token = getToken();
        getUser(token).then(res => {
            setUser(res);
            setLoaded(true);
        });
    }, [loaded]);

    useEffect(() => {
        if(isOpen) {
            collapse.current.classList.add('show');
            $('#cover').css({ display: "block" }).on('click', () => setOpen(!isOpen));           
        }
        else {
            collapse.current.classList.remove('show');
            $('#cover').css({ display: "none" }).off('click');
        }
    }, [isOpen])

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand ml-lg-5 pl-5" to="/">
                    <h2 className="logo">Compass</h2>
                </Link>
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
                    <div className="ml-auto mr-3 mr-lg-5 pr-lg-5">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item text-center">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item text-center">
                                <Link className="nav-link" to="/about-us">About Us</Link>
                            </li>
                            {loaded &&
                                <React.Fragment>
                                    {user &&
                                        <React.Fragment>
                                            <li className="nav-item text-center">
                                                <Link className="nav-link" to="/account">{user.name}</Link>
                                            </li>
                                            <li className="nav-item text-center">
                                                <Link className="nav-link" to="/auth/logout">Logout</Link>
                                            </li>
                                        </React.Fragment>
                                    }
                                    {!user &&
                                        <React.Fragment>
                                            <li className="nav-item text-center">
                                                <Link className="nav-link" to="/auth/login">Sign in</Link>
                                            </li>
                                            <li className="nav-item text-center">
                                                <Link className="nav-link" to="/auth/register">Sign up</Link>
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
                    <Link to="/"><i className="fa fa-home mr-3"></i>Home</Link>
                    <br/>
                    <Link to="/contact"><i className="fa fa-envelope mr-3"></i>Contact</Link>
                    <br/>
                    <Link to="/about-us"><i className="fa fa-info mr-3 mb-4"></i>About us</Link>
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