import {GRAPHQL_HTTP_ENDPOINT} from '../services/constants';

export async function request(query, variables?) {
    const response = await window.fetch(GRAPHQL_HTTP_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const responseJSON = await response.json();

    if (responseJSON.errors) {
        alert(responseJSON.errors.map((error: any) => error.message).join(','));
    }
    else {
        return responseJSON.data;
    }
}