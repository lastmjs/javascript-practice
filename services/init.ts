import { Store } from './store';
import { request } from './graphql';

loadUser();

export async function loadUser() {
    const user = Store.getState().user;

    if (user) {
        const response = await request(`
            query($id: ID!) {
                user(where: {
                    id: $id
                }) {
                    id
                    email
                    tokens
                    assessmentInfos {
                        id
                        assessment {
                            concept {
                                id
                            }
                        }
                        answeredCorrectly
                    }
                }
            }
        `, {
            id: user.id
        });

        Store.dispatch({
            type: 'LOGIN_USER',
            user: response.user,
            userJWT: Store.getState().userJWT
        });
    }
}