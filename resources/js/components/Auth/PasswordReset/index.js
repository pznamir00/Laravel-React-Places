import React, { useState, useEffect } from 'react';
import { passwordReset } from '../../../api';


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
        axios.get('/api/password/find/' + _token)
        .then(res => res.data)
        .then(res => setData({
            token: res.token,
            email: res.email,
            password: "",
            password_confirmation: "",
            loaded: true
        }))
        .catch(() => props.history.push('/')) //password reset token not exists*/
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
            data.password,
            data.password_confirmation,
            data.email,
            data.token
        );
    }

    if(data.loaded){
        return(
            <div>
                <form onSubmit={onSubmitHandle}>
                    <label>
                        New password
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={onChangeHandle}
                        />
                    </label>
                    <label>
                        Confirm password
                        <input
                            name="password_confirmation"
                            type="password"
                            className="form-control"
                            onChange={onChangeHandle}
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Reset</button>
                </form>
            </div>
        )
    }
    else{
        return <p>Loading...</p>
    }
}


export default PasswordReset;