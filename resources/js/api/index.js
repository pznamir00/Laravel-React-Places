import axios from 'axios';
import { setToken, deleteToken, setMessage } from '../functions';
import $ from 'jquery';



const getAddress = (lat, lon) => {
    return new Promise(resolve => {
        fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=2&q=${lat},%20${lon}&format=json&limit=1`)
        .then(res => res.json())
        .then(res => resolve(res[0].address))
        .catch(() => resolve(null));
    })
}


const login = (history, email, password) => {
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
        history.push('/');
        setMessage('success', 'You logged successfuly');
    })
    .catch(() => {
        $('input[name="email"]').val('');
        $('input[name="password"]').val('');
        setMessage('error', 'Incorrect email or password');
    });
}



const logoutUser = (history, token) => {
    fetch('http://127.0.0.1:8000/api/logout', {
        headers: { 
            "Authorization": `Bearer ${token}` 
        }
    })
    .then(res => res.json())
    .then(() => {
        deleteToken();
        history.push('/');
        setMessage('success', 'Logout successfuly');
    })
    .catch(status => console.error(status))
}



const register = (history, email, name, password, password_confirmation) => {
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
        history.push('/');
        setMessage('success', 'Registered successfuly');
    })
    .catch(() => {
        $('input[name="password"]').val('');
        $('input[name="password_confirmation"]').val('');
        setMessage('error', 'Something went wrong. Try again');
    });
}



const passwordForgot = email => {
    axios.post('/api/password/forgot', { email }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .then(res => setMessage('info', res.message))
    .catch(() => setMessage('error', 'Something went wrong. Try again'));
} 



const passwordReset = (history, password, password_confirmation, email, token) => {
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
    .then(() => {
        history.push('/auth/login');
        setMessage('success', 'Your password was updated');
    })
    .catch(() => setMessage('error', 'Your data are invalid'));
}



const passwordFind = (history, token) => {
    return new Promise(resolve => {
        axios.get('/api/password/find/' + token)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(() => {
            history.push('/');
            setMessage('error', 'Token does not exist');
        })
    })
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



const fetchCategories = () => {
    return new Promise(resolve => {
        axios.get('/api/categories')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(() => resolve([]));
    })
}



const postPlace = (history, data, token) => {
    delete data.address;
    delete data.country;
    axios.post('/api/places', data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.data)
    .then(res => {
        history.push('/');
        setMessage('success', res.success);
    })
    .catch(() => setMessage('error', 'Something went wrong. Try again'));
}



const putPlace = (history, data, token, id) => {
    delete data.address;
    delete data.country;
    axios.put(`/api/places/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.data)
    .then(res => {
        history.push('/');
        setMessage('success', res.success);
    })
    .catch(status => {
        console.error(status);
        setMessage('error', 'Something went wrong. Try again');
    });
}



const deletePlace = (history, id, token) => {
    axios.delete(`/api/places/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.data)
    .then(res => {
        history.push('/');
        setMessage('success', res.success);
    })
    .catch(() => setMessage('error', 'Something went wrong. Try again'));
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



const postMessage = (history, data) => {
    axios.post('api/contacts', data, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => res.data)
    .then(res => {
        history.push('/');
        setMessage('success', res.success);
    })
    .catch(() => {
        setMessage('error', 'Something went wrong. Try again');
        $('input[name="email"]').val('');
        $('input[name="subject"]').val('');
        $('textarea[name="message"]').val('');
    });
}


const deleteAccount = (history, token) => {
    axios.delete('/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        deleteToken();
        window.location.replace('/');
    })
    .catch(() => setMessage('error', 'Something went wrong'));
}



export {
    getAddress,
    login,
    register,
    passwordForgot,
    passwordReset,
    passwordFind,
    getUser,
    logoutUser,
    fetchCategories,
    postPlace,
    putPlace,
    deletePlace,
    getPlaces,
    getOnePlace,
    postMessage,
    deleteAccount
}