import { logoutUser } from '../../../api';
import { getToken } from '../../../functions';

const Logout = props => {
    let token = getToken();
    logoutUser(props.history, token);
    return null;
}

export default Logout;