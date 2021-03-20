import React, { useState, useEffect } from 'react';
import { passwordReset, passwordFind } from '../../../api';
import './style.scss';

const PasswordReset = props => {
    
    const [ data, setData ] = useState({
        password: "",
        password_confirmation: "",
        email: "",
        token: "",
        loaded: false
    });

    useEffect(() => {
        const _token = props.match.params.token;
        passwordFind(props.history, _token)
        .then(res => setData({
            token: res.token,
            email: res.email,
            password: "",
            password_confirmation: "",
            loaded: true
        }))
    }, [])

    const onChangeHandle = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const onSubmitHandle = e => {
        e.preventDefault();
        passwordReset(
            props.history,
            data.password,
            data.password_confirmation,
            data.email,
            data.token
        );
    }

    if(data.loaded){
        return(
            <div id="reset-password-form">
                <h3 className="title text-center mb-3">Reset your password</h3>
                <form onSubmit={onSubmitHandle}>
                    <div className="mb-2 inner-addon right-addon">
                        <i className="glyphicon fa fa-lock trailing"></i>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={onChangeHandle}
                            className="form-control form-icon-trailing"
                        />
                    </div>
                    <div className="mb-2 inner-addon right-addon">
                        <i className="glyphicon fa fa-lock trailing"></i>
                        <input
                            name="password_confirmation"
                            type="password"
                            placeholder="Password confirmation"
                            onChange={onChangeHandle}
                            className="form-control form-icon-trailing"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Reset</button>
                </form>
            </div>
        )
    }
    else{
        return <div className="text-center pt-5 mt-5">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>
    }
}


export default PasswordReset;