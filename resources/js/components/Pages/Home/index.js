import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { getPlaces, fetchCategories } from '../../../api';

export default class Home extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            places: [],
            geocoder: L.Control.Geocoder.nominatim(),
            categories: [],
            filters: {
                createdFrom: '',
                createdTo: '',
                categoryId: '',
                keywords: ''
            }
        }
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    fetchPlaces(){
        getPlaces(this.state.filters)
        .then(places => this.setState({ places }))
        .then(() => {
            this.state.places.map(place => {
                const { lat, lon } = place.location;
                const popupContent = `<a href="/places/${place.slug}">
                    <img src="/${place.images[0].name}" style="width:100px;height:100px;" alrt="Picture"/>
                    <p>${place.short_description.substring(0, 10)}...</p>
                </a>`;
                const popupOptions = {
                'maxWidth': '200',
                'className' : 'custom'
                }
                return (
                    L.marker([lat, lon]).bindTooltip('TEST', {
                        permanent: true, 
                        direction: 'right'
                    }).bindPopup(popupContent, popupOptions).openPopup().addTo(this.map)
                );         
            })
        })
    }

    componentDidMount(){
        this.fetchPlaces();
        fetchCategories().then(categories => this.setState({ categories }));
        this.map = L.map("map", {
            center: [58, 16],
            zoom: 2.5,
            zoomControl: true
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        var geocoder = L.Control.geocoder();
        geocoder.addTo(this.map);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.filters !== this.state.filters){
            this.fetchPlaces();
        }
    }

    onChangeFilter(e){
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                [name]: value
            }
        })
    }

    clearFilters(){
        this.setState({
            ...this.state,
            filters: {
                createdFrom: '',
                createdTo: '',
                categoryId: '',
                keywords: ''
            }
        })
    }

    render(){
        return(
            <div>
                <h1>HOME</h1>
                <div>
                    <h3>FILTERS</h3>
                    <div>
                        Created from
                        <input 
                            type='date' 
                            name='createdFrom' 
                            className='form-control'
                            onChange={this.onChangeFilter}
                            value={this.state.filters.createdFrom}
                        />
                        Created to
                        <input 
                            type='date' 
                            name='createdTo' 
                            className='form-control'
                            onChange={this.onChangeFilter}
                            value={this.state.filters.createdTo}
                        />
                        Category
                        <select 
                            name='categoryId' 
                            className='form-control'
                            onChange={this.onChangeFilter}
                        >
                            <option value='' selected={this.state.filters.categoryId === ''}>Select...</option>
                            {this.state.categories.map((cat, key) => 
                                <option 
                                    key={key}
                                    value={cat.id}
                                >{cat.name}</option>
                            )}
                        </select>
                        Search
                        <input
                            type='text'
                            name='keywords'
                            className='form-control'
                            onChange={this.onChangeFilter}
                            value={this.state.filters.keywords}
                        />
                        <button type='button' onClick={this.clearFilters}>Clear filters</button>
                    </div>
                </div>
                <div id="map"/>
            </div>
        )
    }
}