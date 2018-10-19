import { Store } from '../services/store';
import { GRAPHQL_HTTP_ENDPOINT } from '../services/constants';

export async function request(query: any, variables?: any) {
    const response = await window.fetch(GRAPHQL_HTTP_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Store.getState().userJWT}`
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const responseJSON = await response.json();

    if (responseJSON.errors) {
        Store.dispatch({
            type: 'ADD_NOTIFICATION',
            notification: responseJSON.errors.map((error: any) => error.message).join(',')
        });
    }
    else {
        return responseJSON.data;
    }
}