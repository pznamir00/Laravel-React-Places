import React, { Component } from 'react';
import { fetchCategories } from '../../../api';
import Map from './Map';
import Images from './Images';
import { postPlace } from '../../../api';
import { getToken } from '../../../functions';

export default class AddPlace extends Component{
    
    constructor(props){
        super(props);        
        this.state = {};
        if(this.props.type === 'EDIT'){
            this.state = {
                data: {
                    title: this.props.data.title,
                    slug: this.props.data.slug,
                    short_description: this.props.data.short_description,
                    category_id: this.props.data.category_id,
                    address: this.props.data.address,
                    country: this.props.data.country,
                    lat: this.props.data.lat,
                    lon: this.props.data.lon,
                    images: this.props.data.images
                },
                categories: []
            }
        }
        else{
            this.state = {
                data: {
                    title: "",
                    slug: "",
                    short_description: "",
                    category_id: "",
                    address: "",
                    country: "",
                    lat: "",
                    lon: "",
                    images: {}
                },
                categories: []
            }
        }
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.onDropImg = this.onDropImg.bind(this);
    }

    
    async componentDidMount(){
        let categories = await fetchCategories();
        this.setState({ categories });
    }

    
    onChangeHandle(e){
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    }


    onDropImg(images) {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                images
            }
        });
    }


    updateLocation(){
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                lat: arguments[0],
                lon: arguments[1],
                address: arguments[2],
                country: arguments[3]
            }
        });
    }


    onSubmitHandle(e){
        e.preventDefault();
        let data = Object.assign({}, this.state.data);
        let arr = [];
        for(const [key, value] of Object.entries(data.images)){
            arr.push(value);
        }
        data.images = arr;
        delete data.address;
        delete data.country;

        if(Object.keys(this.state.data.images).length === 0){
            return alert('You must upload the least 1 picture');
        }
        if(this.state.data.lat === ''){
            return alert('You must select location');
        }
        
        if(!this.props.type){
            postPlace(this.props.history, data, getToken());
        } else {
            this.props.onSubmit(this.props.history, data);
        }
    }


    render(){
        return(
            <div>
                <form onSubmit={this.onSubmitHandle}>
                    <label className="mb-4">
                        <i className="fa fa"></i>Title
                        <input 
                            name="title"
                            type="text"
                            className="form-control"
                            onChange={this.onChangeHandle}
                            defaultValue={this.state.data.title}
                        />                       
                    </label>
                    <div className="d-flex justify-content-between mb-4">
                        <label style={{width:'50%'}}>
                            Slug
                            <input 
                                name="slug"
                                type="text"
                                className="form-control"
                                onChange={this.onChangeHandle}
                                defaultValue={this.state.data.slug}
                            />                       
                        </label>
                        <label style={{width:'50%'}}>
                            Category
                            <select name="category_id" onChange={this.onChangeHandle} className="form-control">
                                <option value=''>Select...</option>
                                {this.state.categories.map((category, key) => 
                                    <option 
                                        key={key} 
                                        value={category.id}
                                        selected={category.id == this.state.data.category_id}
                                    >{category.name}</option>
                                )}
                            </select>                  
                        </label>
                    </div>
                    <div className="container m-0 p-0">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label>
                                    Short Description
                                    <textarea
                                        name="short_description"
                                        className="form-control"
                                        onChange={this.onChangeHandle}
                                        defaultValue={this.state.data.short_description}
                                        maxLength="512"
                                        style={{height:'300px'}}
                                    ></textarea>                       
                                </label>
                            </div>
                            <div className="col-12 col-md-6">
                                <p className="mb-0">Address: {this.state.data.address} {this.state.data.address ? ', ' : ''} {this.state.data.country}</p>
                                <Map 
                                    updateLocation={this.updateLocation} 
                                    lat={this.state.data.lat} 
                                    lon={this.state.data.lon}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Images
                            images={this.state.data.images}
                            setImages={this.onDropImg}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary m-2"
                    >Save</button>
                </form>
            </div>
        )
    }
}