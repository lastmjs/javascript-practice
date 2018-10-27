import { Store } from './store';
import { request } from './graphql';
import page from 'page';

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
                    termsAcceptedVersion
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

                constant(where: {
                    key: TERMS_AND_PRIVACY_VERSION
                }) {
                    value
                }
            }
        `, {
            id: user.id
        });

        if (response.user.termsAcceptedVersion !== response.constant.value && window.location.pathname !== '/legal/terms-and-privacy') {
            page('/legal/accept-new-terms');
            return;
        }

        Store.dispatch({
            type: 'LOGIN_USER',
            user: response.user,
            userJWT: Store.getState().userJWT
        });
    }
}