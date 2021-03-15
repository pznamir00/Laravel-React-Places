import React, { useState, useEffect } from 'react';
import { getUser, getPlaces } from '../../../api';
import { getToken } from '../../../functions';


const Account = () => {
    
    const [user, setUser] = useState(null);
    const [places, setPlaces] = useState([]);
    
    useEffect(() => {
        let token = getToken();
        getUser(token)
        .then(res => {
            setUser(res);
            return res;
        })
        .then(res => {
            getPlaces({ authorId: res.id })
            .then(places => setPlaces(places));
        })
    }, [])

    if(!user){
        return <div>Loading...</div>
    }
    return(
        <div>
            <b>Email: </b>{user.email}<br/>
            <b>Name: </b>{user.name}<br/>

            <div>
                {places.map((place, key) => 
                    <a href={`/places/${place.slug}`} key={key}>{place.title}</a>
                )}
            </div>
        </div>
    )
}


export default Account;