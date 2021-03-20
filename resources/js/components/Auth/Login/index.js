import React, { useState } from 'react';
import { login } from '../../../api';
import { Link } from 'react-router-dom';
import './style.scss';

const Login = props => {

    const [ data, setData ] = useState({
        email: "",
        password: ""
    });

    const onChangeHandle = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const onSubmitHandle = e => {
        e.preventDefault();
        login(
            props.history,
            data.email,
            data.password
        );
    }

    return(
        <div id='login-bg'>
            <h1 className='text-center'>Sign in</h1>
            <div id="login-form" className='card p-5 mx-auto shadow-xl' style={{width: '90vw', maxWidth: '500px'}}>
                <form onSubmit={onSubmitHandle}>
                    <div className="mb-2 inner-addon right-addon">
                        <label for="email" className="text-left text-muted p-0 m-0">Email</label>
                        <i className="glyphicon fa fa-user trailing"></i>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            onChange={onChangeHandle}
                            className="form-control form-icon-trailing"
                        />
                    </div>
                    <div className="mb-2 inner-addon right-addon">
                        <label for="password" className="text-left text-muted p-0 m-0">Password</label>
                        <i className="glyphicon fa fa-lock trailing"></i>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            onChange={onChangeHandle}
                            className="form-control form-icon-trailing"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        style={{width: '100%'}}
                    >Login</button>
                </form>
            </div>
            <div className="links">
                <Link to='/auth/register'>
                    You don't have an account? Let's register
                </Link>
                <br/>
                <Link to='/auth/password/forgot'>
                    You don't remember a password?
                </Link>
            </div>
        </div>
    )
}


export default Login;