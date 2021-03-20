import React, { useState } from 'react';
import { register } from '../../../api';
import { validateEmail } from '../../../functions';
import { Link } from 'react-router-dom';
import './style.scss';


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
    let passwordsAreValid = (data.password.length != 0 && data.password == data.password_confirmation) ? 'is-valid' : '';
    return(
        <div className="card" id="register-form">
            <h3 className="text-center">Join us. Create an account</h3>
            <form onSubmit={onSubmitHandle} className="p-5 mb-5">
                <div className="inner-addon right-addon">
                    <i className="glyphicon fa fa-envelope-open-text"></i>
                    <input
                        name="email"
                        type="email"
                        onChange={onChangeHandle}
                        className={`form-control ${emailIsValid}`}
                        placeholder="Email"
                    />
                    {emailIsValid && <span className="valid-feedback" style={{position:'absolute'}}>Email is good</span>}
                </div>
                <div className="inner-addon right-addon">
                    <i className="glyphicon fa fa-user"></i>
                    <input
                        name="name"
                        type="text"
                        onChange={onChangeHandle}
                        className={`form-control ${nameIsValid}`}
                        placeholder="Name"
                    />
                    {nameIsValid && <span className="valid-feedback" style={{position:'absolute'}}>Name is good</span>}
                </div>
                <div>
                    <div className="inner-addon right-addon mb-2">
                        <i className="glyphicon fa fa-lock"></i>
                        <input
                            name="password"
                            type="password"
                            onChange={onChangeHandle}
                            className={`form-control ${passwordsAreValid}`}
                            placeholder="Password"
                        />
                    </div>
                    <div className="inner-addon right-addon mb-5">
                        <i className="glyphicon fa fa-lock"></i>
                        <input
                            name="password_confirmation"
                            type="password"
                            onChange={onChangeHandle}
                            className={`form-control ${passwordsAreValid}`}
                            placeholder="Confirm password "
                        />
                        {passwordsAreValid && <span className="valid-feedback">Password is good</span>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary m-2 mt-4"
                >Register</button>
                <Link to="/auth/login" className="ml-5 text-muted">
                    Do you have an account? Let's login
                </Link>
            </form>
        </div>
    )
}


export default Register;