import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { getOnePlace, getUser, deletePlace, getAddress } from '../../../api';
import ImageViewer from 'react-simple-image-viewer';
import { getToken } from '../../../functions';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './style.scss';

const OnePlace = props => {
    
    const [place, setPlace] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken());

    useEffect(() => {
        $(window).on('resize', resize);
        (async() => {
            const { slug } = props.match.params;
            await getUser(token)
            .then(res => setUser(res));
            getOnePlace(slug)
            .then(res => {
                res.created_at = convertDatetimeFormat(new Date(res.created_at));
                res.images = res.images.map(img => {
                    return { ...img, name: '/' + img.name };
                })
                return res;
            })
            .then(async(place) => {
                place.address = await getAddress(place.location.lat, place.location.lon);
                setPlace(place);
            })
            .then(resize);
        })()
    }, [])

    const convertDatetimeFormat = datetime => {
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZone: 'America/Los_Angeles'
        };
        return new Intl.DateTimeFormat('en-US', options).format(datetime);
    }

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);
    
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const _deletePlace = () => deletePlace(props.history, place.id, token);

    const resize = () => {
        let width = $('.img-thumbnail').width();
        $('.img-thumbnail').css({ "height": width });
    }


    if(!place){
        return <div className="text-center pt-5 mt-5">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>
    }
    
    return(
        <div className='mt-5 pt-5' id="one-place">
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure, do you want to delete this place?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={_deletePlace}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between text-field">
                <h3 className="title">{place.title}</h3>
                <div>
                    {(user && user.id === place.author.id) &&
                        <div className='mt-0 ml-4 d-inline-block'>
                            <Link 
                                className="btn btn-primary mr-1 mb-2" 
                                to={`/places/management/edit/${place.slug}`}
                            ><i className="fa fa-edit"></i></Link>
                            <button 
                                className='btn btn-primary bg-danger pr-3 mb-2' 
                                data-toggle="modal" 
                                data-target="#exampleModal"
                            ><i className="fa fa-trash"></i></button>
                        </div>
                    }
                </div>
            </div>
            <hr style={{ marginTop: '0px' }}/>
            <div className="row mt-2">
                <div className="info-content col-12 col-lg-6">
                    <div dangerouslySetInnerHTML={{ __html: place.short_description }} style={{minHeight: '200px'}} />
                    <div className="mb-3">
                        {place.category && <React.Fragment><b>Category:</b> {place.category.name}</React.Fragment>}<br/>
                        <b>Added at: </b>{place.created_at}<br/>
                        <b>Address: </b>{place.address.house_number} {place.address.road} {place.address.country}
                    </div>
                    <div className="bottom-controls">
                        <div className='container my-3'>
                            <div className="row">
                                {place.images.map((img, key) => 
                                    <img 
                                        src={img.name} 
                                        key={key} 
                                        alt="Pic"
                                        className="col-12 col-sm-4 img-thumbnail m-0 p-0"
                                        onClick={ () => openImageViewer(key) }
                                    />
                                )}
                            </div>
                        </div>
                        {isViewerOpen && (
                            <ImageViewer
                                src={ place.images.map(img => img.name) }
                                currentIndex={ currentImage }
                                onClose={ closeImageViewer }
                            />
                        )}
                    </div>
                </div>
                <div className="col-12 col-lg-6 mt-5 mt-md-0 mb-5 pb-5">
                    <MapContainer center={[place.location.lat, place.location.lon]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[place.location.lat, place.location.lon]}></Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}


export default OnePlace;