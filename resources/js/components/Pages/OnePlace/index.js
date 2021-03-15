import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { getOnePlace, getUser, deletePlace, getAddress } from '../../../api';
import ImageViewer from 'react-simple-image-viewer';
import { getToken } from '../../../functions';
import './style.css';

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
        <div>
            <h1>Title: {place.title}</h1>
            <p>Description: {place.short_description}</p>
            <p>Created at: {place.created_at}</p>
            {place.category && 
                <p>Category: {place.category.name}</p>
            }
            <div>
                {place.address.house_number}
                {place.address.road}
                {place.address.country}
            </div>
            <MapContainer center={[51,14]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[place.location.lat, place.location.lon]}></Marker>
            </MapContainer>
            <div className='d-flex justify-content-around'>
                {place.images.map((img, key) => 
                    <img 
                        src={img.name} 
                        key={key} 
                        alt="Pic"
                        className="place-img"
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
            <div>
                {(user && user.id === place.author.id) &&
                    <div>
                        <a href={`/places/management/edit/${place.slug}`}>Edit</a>
                        <button className='btn btn-danger' onClick={_deletePlace}>Delete</button>
                    </div>
                }
            </div>
        </div>
    )
}


export default OnePlace;