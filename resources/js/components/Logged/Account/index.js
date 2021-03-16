import React, { useState, useEffect } from 'react';
import { getUser, getPlaces } from '../../../api';
import { getToken } from '../../../functions';
import { Link } from 'react-router-dom';


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
        <div className='card mx-auto' style={{width:'90vw',maxWidth:'700px'}}>
            <div className='d-flex justify-content-between p-2 p-md-5'>
                <div>
                    <h3><i className='fa fa-user mr-3'></i>{user.name}</h3>
                    <div>
                        Your data:
                        <ul>
                            <li>Email: {user.email}</li>
                            <li>Name: {user.name}</li>
                            <li>ID: {user.id}</li>
                            <li>You have {places.length} places</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Link to='/places/management/add'><i className='fa fa-plus mr-2'></i>Add place</Link>
                    <br/>
                    <Link to='/auth/logout'><i className='fa fa-sign-out-alt mr-2'></i>Logout</Link>
                </div>
            </div>
            <hr/>
            <div className='container'>
                <div className='row-fluid'>
                    {places.map((place, key) => 
                        <Link to={`/places/${place.slug}`} key={key}>
                            <div 
                                style={{
                                    backgroundImage: `url('/${place.images[0].name}')`,
                                }}
                                className="text-center"
                            >
                                {place.title}
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Account;