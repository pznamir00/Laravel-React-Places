import React, { useState, useEffect } from 'react';
import { getUser, getPlaces, deleteAccount } from '../../api';
import { getToken } from '../../functions';
import { Link } from 'react-router-dom';
import './style.scss';
import $ from 'jquery';

const Account = props => {
    
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
            .then(places => setPlaces(places))
            .then(setTimeout(resize, 500));
        })
        window.addEventListener('resize', resize);
    }, [])

    const _deleteAccount = () => deleteAccount(props.history, getToken());

    const resize = () => {
        let width = $('.img-thumbnail').width();
        $('.img-thumbnail').css({ 'height': width + 'px' });
    }

    if(!user){
        return <div className="text-center pt-5 mt-5">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>
    }
    return(
        <div className='row' id="dashboard">
            <div id="panel" className="col-4 col-md-3 col-lg-2">
                <h5 className="text-center"><i className="fa fa-user d-none d-sm-inline-block mr-3 mb-5 mt-2"></i>{user.name}</h5>
                <div className="pl-md-2">
                    <Link to="/"><i className="fa fa-home d-none d-sm-inline-block mr-2"></i>Home</Link>
                    <Link to="/places/management/add"><i className="fa fa-plus d-none d-sm-inline-block mr-2"></i>Add Place</Link>
                    <Link to="/auth/logout"><i className="fa fa-sign-out-alt d-none d-sm-inline-block mr-2"></i>Logout</Link>
                    <button 
                        className="text-danger"
                        data-toggle="modal" 
                        data-target="#exampleModal"
                    >
                        <i className="fa fa-times d-none d-sm-inline-block mr-2"></i>
                        Delete Account
                    </button>
                </div>
            </div>
            <div id="places" className="col-8 col-md-9 col-lg-10 p-0 pt-3">
                <h4>You have <span className="just-paint">{places.length}</span> places</h4>
                <div className='container'>
                    <div className='row'>
                        {places.map((place, key) => 
                            <Link to={`/places/${place.slug}`} key={key} className='place col-12 col-sm-6 col-md-4 col-xl-3'>
                                <Link to={`/places/management/edit/${place.slug}`} className="edit-control"><i className="fas fa-edit mr-2"></i></Link>
                                <img src={`/${place.images[0].name}`} className="img-thumbnail"/>
                                <p>{place.title}</p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure, do you want to delete an account?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" onClick={_deleteAccount}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;