import React, { Component } from 'react';
import L from 'leaflet';
import { getPlaces, fetchCategories } from '../../../api';
import './style.scss';
import $ from 'jquery';

export default class Home extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            places: [],
            newestPlaces: [],
            geocoder: L.Control.Geocoder.nominatim(),
            categories: [],
            markerIcon: L.icon({ 
                iconUrl: '/marker.png',
                iconSize: [38, 38],
                iconAnchor: [19, 47],
                popupAnchor: [0,-30]
            }),
            filters: {
                createdFrom: '',
                createdTo: '',
                categoryId: '',
                keywords: ''
            }
        }
        this.markers = [];
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    fetchPlaces(){
        getPlaces(this.state.filters)
        .then(places => this.setState({ places }))
        .then(() => {
            this.markers.forEach(m => this.map.removeLayer(m));
            this.markers = [];
            this.state.places.map(place => {
                const { lat, lon } = place.location;
                const popupContent = `<a href="/places/${place.slug}" class="popup">
                    <h6>${place.title}</h6>
                    <div
                        style="background-image: url(/${place.images[0].name});"
                        class="mx-auto"
                    >
                    </div>
                </a>`;
                const popupOptions = {
                'maxWidth': '200',
                'className' : 'custom'
                }
                const marker = L.marker([lat,lon], {icon: this.state.markerIcon})
                                .bindPopup(popupContent, popupOptions)
                                .openPopup()
                                .addTo(this.map)
                this.markers.push(marker);
                return marker;         
            })
        })
    }

    componentDidMount(){
        //default places
        this.fetchPlaces();
        //get categories
        fetchCategories().then(categories => this.setState({ categories }));
        //prepare map
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
        //get newest places
        getPlaces().then(places => this.setState({
            newestPlaces: places.slice(0, 12)
        })).then(() => this.matchDims());

        //handle of squares newest-section
        window.addEventListener('resize', this.matchDims);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.filters !== this.state.filters){
            this.fetchPlaces();
        }
    }

    matchDims(){
        var cw = $('.square').width();
        $('.square').css({'height':cw+'px'});
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
                <section id="content" className="row card rounded-xl">
                    <div id="filters" className="col-12 col-md-3">
                        <div className="d-flex d-md-block justify-content-between">
                            <h4 className="text-left mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filter d-none d-md-inline-block" viewBox="0 0 16 16">
                                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                <span className="ml-md-2">Filters</span>
                            </h4>
                            <div className="form-group mb-md-4 mt-2 mt-md-3 ml-3 ml-md-0">
                                <input
                                    type='text'
                                    placeholder="Search"
                                    name='keywords'
                                    className='form-control'
                                    onChange={this.onChangeFilter}
                                    value={this.state.filters.keywords}
                                />
                                <div className="input-group-append float-right" style={{marginTop: '-50px'}}>
                                    <span>
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="d-sm-flex d-md-block justify-content-around dates">
                            <div className="mx-0 pt-0">
                                <span className="mt-2 mt-md-0 mr-2 mr-md-0">From</span>
                                <div style={{width:'100%'}}>
                                    <i className="fa fa-calendar d-none d-md-block"></i>
                                    <input 
                                        type='date' 
                                        name='createdFrom' 
                                        className='form-control mb-0 mb-md-2'
                                        onChange={this.onChangeFilter}
                                        value={this.state.filters.createdFrom}
                                    />
                                </div>
                            </div>
                            <div className="mx-0 pt-0">
                                <span className="mt-2 mt-md-0 mr-2 mr-md-0">To</span>
                                <div style={{width:'100%'}}>
                                    <i className="fa fa-calendar d-none d-md-block" aria-hidden="true"></i>
                                    <input 
                                        type='date' 
                                        name='createdTo' 
                                        className='form-control mb-0 mb-md-2'
                                        onChange={this.onChangeFilter}
                                        value={this.state.filters.createdTo}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex d-md-block justify-content-between">
                            <div>
                                <select 
                                    name='categoryId' 
                                    onChange={this.onChangeFilter}
                                    className="mt-4"
                                >
                                    <option value='' selected={this.state.filters.categoryId === ''}>Category</option>
                                    {this.state.categories.map((cat, key) => 
                                        <option 
                                            key={key}
                                            value={cat.id}
                                        >{cat.name}</option>
                                    )}
                                </select>
                            </div>
                            {(this.state.filters.keywords 
                                || this.state.filters.createdFrom 
                                || this.state.filters.createdTo 
                                || this.state.filters.categoryId) &&
                                <button 
                                    type='button' 
                                    className="btn btn-primary mt-0" 
                                    style={{height: '40px', marginTop: '22px'}} 
                                    onClick={this.clearFilters}
                                >
                                    <i className="fa fa-times"></i>
                                </button>
                            }
                        </div>
                    </div>
                    <div id="map" className="col-12 col-md-9"/>
                </section>
                <section>
                    <div id="crooked-bg"></div>
                    <div id="newest-places" className="container">
                        <h1 className="text-center">Explore newest places</h1>
                        <div className="row">
                            {this.state.newestPlaces.map((place, key) => 
                                <a href={`/places/${place.slug}`} key={key} className="square col-6 col-md-4 col-lg-3">
                                    <div className="mini-eye">
                                        <i className="fa fa-eye mr-2"></i>
                                    </div>
                                    <img
                                        src={`/${place.images[0].name}`}
                                        alt="Picture"
                                    />
                                    <h6 style={{zIndex: '10', marginTop: '-30px'}}>{place.title}</h6>
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}