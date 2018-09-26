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
        alert(JSON.stringify(responseJSON.errors, null, 2));
    }
    else {
        return responseJSON.data;
    }
}