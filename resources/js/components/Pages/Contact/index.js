import React, { Component } from 'react';
import { postMessage } from '../../../api';
import { validateEmail } from '../../../functions';
import './style.scss'; 


export default class Contact extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            subject: "",
            message: ""
        }

        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    onSubmitHandle(e){
        e.preventDefault();
        postMessage(this.state);
    }

    onChangeHandle(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        let emailIsValid = validateEmail(this.state.email) ? 'is-valid' : '';
        let subjectIsValid = this.state.subject.length !== 0 ? 'is-valid' : '';
        let messageIsValid = this.state.message.length !== 0 ? 'is-valid' : '';
        return(
            <div className="card pb-5 mt-5 mb-5 mx-auto" style={{width: '90%', maxWidth: '800px'}}>
                <h1 id="contact-header" className="h4"><i className="fa fa-envelope mr-3"></i>Contact with us</h1>
                <form onSubmit={this.onSubmitHandle} style={{width: '80%', maxWidth: '600px'}} className="mx-auto">
                    <label>
                        Email
                        <input 
                            type="email" 
                            name="email" 
                            onChange={this.onChangeHandle} 
                            className={`form-control ${emailIsValid}`} 
                            required 
                        />
                        <br/>
                    </label>
                    <label>
                        Subject
                        <input 
                            type="text" 
                            name="subject" 
                            onChange={this.onChangeHandle}
                            className={`form-control ${subjectIsValid}`} 
                            required 
                        />
                        <br/>
                    </label>
                    <label>
                        Message
                        <textarea 
                            name="message" 
                            onChange={this.onChangeHandle} 
                            className={`form-control ${messageIsValid}`} 
                            required
                        ></textarea>
                        <br/>
                    </label>
                    <div>
                        <button 
                            type="submit" 
                            className="btn btn-primary ml-3"
                        ><i className='fa fa-paper-plane mr-2'></i>Send</button>
                    </div>
                    <span 
                        className="text-muted float-right mr-3" 
                        style={{fontSize: '10px', marginTop: '-20px'}}
                    >* All data are required</span>
                </form>
            </div>
        )
    }
}