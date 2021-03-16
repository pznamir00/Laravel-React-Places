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

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export {
    setToken,
    getToken,
    deleteToken,
    setMessage,
    validateEmail
}