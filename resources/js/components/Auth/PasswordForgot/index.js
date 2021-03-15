import React, { useState } from 'react';
import { passwordForgot } from '../../../api';


const PasswordForgot = () => {

    const [ data, setData ] = useState({
        email: "",
    });

    const onChangeHandle = e => {
        const { value } = e.target;
        setData({ email: value });
    }

    const onSubmitHandle = e => {
        e.preventDefault();
        passwordForgot(data.email);
    }

    return(
        <div>
            Forgot Password?
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
                <button
                    type="submit"
                    className="btn btn-primary"
                >Sent password reset link</button>
            </form>
        </div>
    )
}


export default PasswordForgot;