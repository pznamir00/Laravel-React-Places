import { NotificationManager } from 'react-notifications';

const setToken = val => window.localStorage.setItem('access_token', val);

const getToken = () => window.localStorage.getItem('access_token');

const deleteToken = () => window.localStorage.removeItem('access_token');

const redirect = url => window.location.replace(url);

const setMessage = (type, text) => {
    switch (type) {
        case 'info':
          NotificationManager.info(text);
          break;
        case 'success':
          NotificationManager.success(text);
          break;
        case 'warning':
          NotificationManager.warning(text);
          break;
        case 'error':
          NotificationManager.error(text);
          break;
    }
}

const setMessageAfterRedirect = (type, text) => {
    window.localStorage.setItem('messInBuffor', JSON.stringify({ type, text }));
}

export {
    setToken,
    getToken,
    deleteToken,
    redirect,
    setMessage,
    setMessageAfterRedirect
}