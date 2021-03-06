import * as jwt from 'jsonwebtoken';

export function getUserId(context, errorMessage) {
    const token = context.request.headers['authorization'] ? context.request.headers['authorization'].replace('Bearer ', '') : 'NO_TOKEN_PRESENT';
    const payload = getPayload(token, process.env.APPLICATION_SERVER_SECRET, errorMessage);

    return payload.userId;
}

function getPayload(token, secret, errorMessage) {
    try {
        return jwt.verify(token, secret);
    }
    catch(error) {
        console.log(error);
        throw new Error(errorMessage);
    }
}