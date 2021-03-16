import React, { useState } from 'react';
import { login } from '../../../api';
import { Link } from 'react-router-dom';

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
        <div className='card p-5 mx-auto' style={{wisth: '90vw', maxWidth: '500px'}}>
            <h1 className='text-center mb-5'><i className='fa fa-user mr-3'></i>Sign in</h1>
            <form onSubmit={onSubmitHandle}>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        onChange={onChangeHandle}
                        className="form-control"
                    />
                </label>
                <br/>
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        onChange={onChangeHandle}
                        className="form-control"
                    />
                </label>
                <br/>
                <button
                    type="submit"
                    className="btn btn-primary m-2"
                >Login</button>
                <Link to='/auth/register' className='ml-2'>
                    You don't have an account? Let's register
                </Link>
            </form>
        </div>
    )
}


export default Login;