import {GRAPHQL_HTTP_ENDPOINT} from '../services/constants';

export async function request(query, variables?) {
    const response = await window.fetch(GRAPHQL_HTTP_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query
        })
    });

    const responseJSON = await response.json();

    if (responseJSON.errors) {
        throw responseJSON.errors;
    }
    else {
        return responseJSON.data;
    }
}