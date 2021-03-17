import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { getOnePlace, getUser, deletePlace, getAddress } from '../../../api';
import ImageViewer from 'react-simple-image-viewer';
import { getToken } from '../../../functions';
import { Link } from 'react-router-dom';
import './style.scss';

const OnePlace = props => {
    
    const [place, setPlace] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken());

    useEffect(() => {
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

    const _deletePlace = () => deletePlace(place.id, token);


    if(!place){
        return <div>Loading...</div>
    }
    
    return(
        <div className='mt-5 pt-5'>
            <div className="d-flex justify-content-between text-field">
                <h3>{place.title}</h3>
                <div>
                    {(user && user.id === place.author.id) &&
                        <div className='mt-0 ml-4 d-inline-block'>
                            <Link className="btn btn-primary mr-1" to={`/places/management/edit/${place.slug}`}><i className="fa fa-edit"></i></Link>
                            <button className='btn btn-danger rounded-0' onClick={_deletePlace}><i className="fa fa-trash"></i></button>
                        </div>
                    }
                </div>
            </div>
            <hr style={{ marginTop: '0px' }}/>
            <div className="row mt-2">
                <div className="col-12 col-lg-6">
                    <p>{place.short_description}</p>
                    <div className="bottom-controls">
                        <div className='d-flex justify-content-around mb-4'>
                            {place.images.map((img, key) => 
                                <img 
                                    src={img.name} 
                                    key={key} 
                                    alt="Pic"
                                    className="img-thumbnail"
                                    onClick={ () => openImageViewer(key) }
                                />
                            )}
                            {isViewerOpen && (
                                <ImageViewer
                                    src={ place.images.map(img => img.name) }
                                    currentIndex={ currentImage }
                                    onClose={ closeImageViewer }
                                />
                            )}
                        </div>
                        {place.category && <React.Fragment><b>Category:</b> {place.category.name}</React.Fragment>}<br/>
                        <b>Added at: </b>{place.created_at}<br/>
                        <b>Address: </b>{place.address.house_number} {place.address.road} {place.address.country}
                    </div>
                </div>
                <div className="col-12 col-lg-6 mt-5 mt-md-0">
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