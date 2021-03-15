import { logoutUser } from '../../../api';
import { getToken } from '../../../functions';

const Logout = props => {
    let token = getToken();
    logoutUser(token);
    return null;
}

export default Logout;