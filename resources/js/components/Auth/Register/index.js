import React, { useState } from 'react';
import { register } from '../../../api';
import { validateEmail } from '../../../functions';
import { Link } from 'react-router-dom';


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

    let emailIsValid = validateEmail(data.email) ? 'is-valid' : '';
    let nameIsValid = data.name.length !== 0 ? 'is-valid' : '';
    let passwordsAreValid = (data.password.length !== 0 && data.password === data.password_confirmation) ? 'is-valid' : '';
    return(
        <div className="card p-5">
            <h1 className="mb-5 text-center">Create an account</h1>
            <form onSubmit={onSubmitHandle}>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        onChange={onChangeHandle}
                        className={`form-control ${emailIsValid}`}
                    />
                </label>
                <label>
                    Name
                    <input
                        name="name"
                        type="text"
                        onChange={onChangeHandle}
                        className={`form-control ${nameIsValid}`}
                    />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        onChange={onChangeHandle}
                        className={`form-control ${passwordsAreValid}`}
                    />
                </label>
                <label>
                    Password Confirm
                    <input
                        name="password_confirmation"
                        type="password"
                        onChange={onChangeHandle}
                        className={`form-control ${passwordsAreValid}`}
                    />
                </label>
                <button
                    type="submit"
                    className="btn btn-primary m-2 mt-4"
                >Register</button>
                <Link to="/auth/login" className="ml-5">
                    Do you have an account? Let's login
                </Link>
            </form>
        </div>
    )
}


export default Register;