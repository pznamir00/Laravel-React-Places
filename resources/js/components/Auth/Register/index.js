import React, { useState } from 'react';
import { register } from '../../../api';


const Register = props => {

    const [ data, setData ] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: ""
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
        register(
            props.history,
            data.email, 
            data.name, 
            data.password, 
            data.password_confirmation
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
                    Name
                    <input
                        name="name"
                        type="text"
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
                <label>
                    Password Confirm
                    <input
                        name="password_confirmation"
                        type="password"
                        onChange={onChangeHandle}
                        className="form-control"
                    />
                </label>
                <button
                    type="submit"
                    className="btn btn-primary"
                >Register</button>
            </form>
        </div>
    )
}


export default Register;