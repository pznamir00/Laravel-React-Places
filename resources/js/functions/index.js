import { NotificationManager } from 'react-notifications';

const setToken = val => window.localStorage.setItem('access_token', val);

const getToken = () => window.localStorage.getItem('access_token');

const deleteToken = () => window.localStorage.removeItem('access_token');

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

export {
    setToken,
    getToken,
    deleteToken,
    setMessage
}