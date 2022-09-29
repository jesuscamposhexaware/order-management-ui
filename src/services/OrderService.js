import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class OrderService { 
    static createOrder(payload, cred) {
        return query({
            endpoint: SERVICE_ENDPOINTS.CREATE_ORDER,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + cred
            },
            data: payload
        });
    }

    static getOrdersByUser(idUser, cred) {
        return query({
            endpoint: SERVICE_ENDPOINTS.GET_ORDERS_BY_USER + idUser,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + cred
            }
        });
    }

    static updateOrder(payload, cred) {
        return query({
            endpoint: SERVICE_ENDPOINTS.UPDATE_ORDER + payload.idOrder,
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + cred
            },
            data: payload
        });
    }

    static cancelOrder(idOrder, cred) {
        return query({
            endpoint: SERVICE_ENDPOINTS.CANCEL_ORDER + idOrder,
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + cred
            }
        });
    }
}

export default OrderService;