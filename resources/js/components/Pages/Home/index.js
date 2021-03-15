import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { getPlaces, fetchCategories } from '../../../api';
import Searcher from './Searcher';


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
        getPlaces(this.state.filters).then(places => this.setState({ places }))
    }

    componentDidMount(){
        this.fetchPlaces();
        fetchCategories().then(categories => this.setState({ categories }));
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
                <MapContainer center={[51,14]} zoom={13} scrollWheelZoom={false}>
                    <Searcher
                        provider={new OpenStreetMapProvider()}
                    />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.places.map((place, key) => 
                        <Marker position={[place.location.lat, place.location.lon]} key={key}>
                            <Popup>
                                <a href={`/places/${place.slug}`}>
                                    <img
                                        style={{ width: '100px', height: '100px' }}
                                        src={place.images[0].name}
                                        alt="Picture"
                                    />
                                    <p>
                                        {place.short_description.substring(0, 10) + '...'}
                                    </p>
                                </a>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        )
    }
}