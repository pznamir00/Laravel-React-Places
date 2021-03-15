import axios from 'axios';
import { setToken, deleteToken, redirect, setMessage, setMessageAfterRedirect } from '../functions';
import $ from 'jquery';



const getAddress = (lat, lon) => {
    return new Promise(resolve => {
        fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=2&q=${lat},%20${lon}&format=json&limit=1`)
        .then(res => res.json())
        .then(res => resolve(res[0].address))
        .catch(() => resolve(null));
    })
}


const login = (email, password) => {
    axios.post('/api/login', {
        email,
        password
    }, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => res.data)
    .then(res => {
        setToken(res.success.token);
        redirect('/');
        setMessageAfterRedirect('success', 'You logged successfuly');
    })
    .catch(() => {
        $('input[name="email"]').val('');
        $('input[name="password"]').val('');
        setMessage('error', 'Incorrect email or password');
    });
}



const register = (email, name, password, password_confirmation) => {
    axios.post('/api/register', {
        email,
        name,
        password,
        password_confirmation
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .then(res => {
        setToken(res.success.token);
        redirect('/');
    })
    .catch(status => console.error(status))
}



const passwordForgot = email => {
    axios.post('/api/password/forgot', { email }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .then(res => console.log(res))
    .catch(status => console.error(status))
} 



const passwordReset = (password, password_confirmation, email, token) => {
    axios.post('/api/password/reset', {
        password,
        password_confirmation,
        email,
        token
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .then(() => redirect('/auth/login'))
    .catch(status => console.error(status))
}



const getUser = token => {
    return new Promise(resolve => {
        fetch('http://127.0.0.1:8000/api/getuser', {
            headers: { 
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(res => resolve(res.success))
        .catch(() => resolve(null));
    })
}



const logoutUser = token => {
    fetch('http://127.0.0.1:8000/api/logout', {
        headers: { 
            "Authorization": `Bearer ${token}` 
        }
    })
    .then(res => res.json())
    .then(() => {
        deleteToken();
        setMessageAfterRedirect('success', 'Logout successfuly');
        redirect('/');
    })
    .catch(status => console.error(status))
}



const fetchCategories = () => {
    return new Promise(resolve => {
        axios.get('/api/categories')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(() => resolve([]));
    })
}



const postPlace = (data, token) => {
    delete data.address;
    delete data.country;
    axios.post('/api/places', data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.data)
    .then(res => {
        redirect('/');
    })
    .catch(console.error);
}



const putPlace = (data, token, id) => {
    delete data.address;
    delete data.country;
    axios.put(`/api/places/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.data)
    .then(() => {
        redirect('/');
        setMessage('success', 'Place updated successfuly');
    })
    .catch(console.error);
}



const deletePlace = (id, token) => {
    axios.delete(`/api/places/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        redirect('/');
    })
    .catch(console.error);
}



const getPlaces = (filters = {}) => {
    return new Promise(resolve => {
        let url = '/api/places';
        let content = [];
        if(filters.authorId) content.push(`&author_id=${filters.authorId}`);
        if(filters.createdFrom) content.push(`&created_from=${filters.createdFrom}`);
        if(filters.createdTo) content.push(`&created_to=${filters.createdTo}`);
        if(filters.categoryId) content.push(`&category_id=${filters.categoryId}`);
        if(filters.keywords) content.push(`&keywords=${filters.keywords}`);
        if(content.length){
            url += '?';
            content.forEach(c => { url += c });
        }
        axios.get(url)
        .then(res => res.data)
        .then(res => resolve(res.data))
        .catch(console.error);
    })
}



const getOnePlace = slug => {
    return new Promise(resolve => {
        axios.get(`/api/places/${slug}`)
        .then(res => res.data)
        .then(res => resolve(res.data))
        .catch(console.error);
    })
}



export {
    getAddress,
    login,
    register,
    passwordForgot,
    passwordReset,
    getUser,
    logoutUser,
    fetchCategories,
    postPlace,
    putPlace,
    deletePlace,
    getPlaces,
    getOnePlace
}