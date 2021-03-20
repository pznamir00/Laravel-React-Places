import React, { useState } from 'react';
import { passwordForgot } from '../../../api';


const PasswordForgot = props => {

    const [ email, setEmail ] = useState("");

    const onChangeEmail = e => setEmail(e.target.value);

    const onSubmitHandle = e => {
        e.preventDefault();
        passwordForgot(email);
    }

    return(
        <div style={{width: '80%', maxWidth: '700px'}} className="mx-auto mt-5 pt-5">
            <h3 className="text-center mb-2"><i className="fas fa-lock mr-3"></i>Forgot Password?</h3>
            <form onSubmit={onSubmitHandle}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={onChangeEmail}
                    className="form-control"
                />
                <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    style={{width:'100%'}}
                >Sent password reset link</button>
            </form>
        </div>
    )
}


export default PasswordForgot;