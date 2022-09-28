import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class ProductService { 
    static getProducts(cred) {
        return query({
            endpoint: SERVICE_ENDPOINTS.GET_PRODUCTS,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + cred
            }
        });
    }
}

export default ProductService;
