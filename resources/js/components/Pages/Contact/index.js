import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


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
        axios.post('api/contacts', this.state, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(status => console.error(status));
    }

    onChangeHandle(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmitHandle}>
                    <label>
                        Email
                        <input 
                            type="email" 
                            name="email" 
                            onChange={this.onChangeHandle} 
                            className="form-control" 
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
                            className="form-control" 
                            required 
                        />
                        <br/>
                    </label>
                    <label>
                        Message
                        <textarea 
                            name="message" 
                            onChange={this.onChangeHandle} 
                            className="form-control" 
                            required
                        ></textarea>
                        <br/>
                    </label>
                    <div>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >Send</button>
                    </div>
                </form>
            </div>
        )
    }
}