import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class SensorService { 
    static getUserByEmail(email, cred) {
        return query({
            endpoint: SERVICE_ENDPOINTS.GET_USER_BY_EMAIL + email,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + cred
            }
        });
    }
}

export default SensorService;