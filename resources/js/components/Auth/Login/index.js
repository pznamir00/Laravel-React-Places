import React, { useState } from 'react';
import { login } from '../../../api';


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
            data.email,
            data.password
        );
    }

    return(
        <div>
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
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        onChange={onChangeHandle}
                        className="form-control"
                    />
                </label>
                <button
                    type="submit"
                    className="btn btn-primary"
                >Login</button>
            </form>
        </div>
    )
}


export default Login;