import React from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import LCG from 'leaflet-control-geocoder';
import './style.scss';


export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.geocoder = L.Control.Geocoder.nominatim();
    }

    mapMarkHandle(){
        const map = useMapEvents({
            click: e => {
                this.geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), results => {
                    if(results.length > 0){
                        const { lat, lng } = results[0].center;
                        var totalAddress = results[0].name;
                        totalAddress = totalAddress.replaceAll(',', '.');
                        totalAddress = totalAddress.split(/\.(?=[^\.]+$)/);
                        var address = totalAddress[0].replaceAll('.', ',');
                        var country = totalAddress[1];
                        this.props.updateLocation(
                            lat,
                            lng,
                            address,
                            country
                        );
                    }
                })
            },
        })
        return null;
    }

    render(){
        const MapMarkHandle = this.mapMarkHandle.bind(this);
        return (
            <MapContainer center={[51,14]} zoom={13} scrollWheelZoom={false}>
                <MapMarkHandle/>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[this.props.lat, this.props.lon]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        )
    }
}