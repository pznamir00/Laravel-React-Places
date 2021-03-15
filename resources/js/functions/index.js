
const setToken = val => window.localStorage.setItem('access_token', val);

const getToken = () => window.localStorage.getItem('access_token');

const deleteToken = () => window.localStorage.removeItem('access_token');

const redirect = url => window.location.replace(url);

export {
    setToken,
    getToken,
    deleteToken,
    redirect
}