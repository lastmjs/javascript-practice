import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import { request } from '../services/graphql';

class JPLegalTermsAndPrivacy extends HTMLElement {
    version: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));    
        
        const termsAndPrivacyVersionResponse = await request(`
            query {
                constant(where: {
                    key: TERMS_AND_PRIVACY_VERSION
                }) {
                    value
                }
            }
        `);

        this.version = termsAndPrivacyVersionResponse.constant.value;

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h3>Version ${this.version}</h3>

                <h1>Terms of use</h1>

                <p>Hey everyone, we are Demergence, the company behind javascriptpractice.com. Thanks for using the site, we'll try to keep the legalese to a minimum.</p>
                
                <p>By using javascriptpractice.com, you agree to the terms of use and the privacy policy.</p>
                
                <p>Changes to the terms of use and privacy policy are effective immediately. After any changes, you will have the opportunity to explicitly accept the new terms of use and privacy policy before continuing to use your account. If you choose to continue using your account without explicitly accepting the new terms, that will constitute as acceptance of the new terms.</p>

                <p>All data and content uploaded through the system by you (including any previously uploaded data or content), sent to us outside of the system (such as through email or other messaging services) by you, or recorded or created by the system is licensed under <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode" target="_blank">CC0 1.0 Universal</a>.</p>

                <p>You must adhere to this <a href="https://github.com/prisma/content/blob/master/static/legal/terms.md#acceptable-use-policy" target="_blank">acceptable use policy</a>.</p>

                <p>We may suspend or terminate your account at our discretion.</p>

                <p>We may take down content that you post at our discretion.</p>

                <p>You cannot sign up for an account unless you are of the appropriate age. In the United States this is 13 years or older. You are responsible for ensuring you are of the appropriate age in your jurisdiction.</p>

                <p>Please do not put personal information in content that you upload.</p>

                <p>You may not use the system if you are a country, organization, entity, or person embargoed or blocked by any government, including those on sanctions lists identified by the United States Office of Foreign Asset Control (OFAC).</p>

                <p>If there are issues with your purchase of tokens, contact jordanlast@demergence.org. Incorrect charges will be refunded appropriately. There will be no other refunds of purchased tokens.</p>

                <p>Tokens are only to be used on javascriptpractice.com, and may be used for any legitimate activity on javascriptpractice.com that requires tokens.</p>

                <p>You may delete your account and cancel your acceptance of this agreement by sending an email to jordanlast@demergence.org.</p>

                <p>
                    THE SERVICES ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL DEMERGENCE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SERVICES OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>

                <h1>Privacy policy</h1>

                <h3>Personal information we collect</h3>
                <p>Email is essentially the only personally identifiable information that we collect and store on our own systems.</p>
                <p>We use cookies to collect data in conjunction with Google Analytics.</p>
                <p>Stripe and its affiliates process Transactions (including payment Transactions) for us. You may be required to provide personally identifiable data to Stripe, including but not limited to credit card information. We may also share some information with Stripe, such as your email address, to facilitate payments (receipts and such).</p>

                <h3>How we use personal information</h3>
                <p>Much of our platform is open source. You may review most if not all of the types of information that we collect <a href="https://github.com/lastmjs/javascript-practice/blob/master/backend/datamodel.prisma" target="_blank">starting here</a>.</p>
                <p>
                    Many activities that you engage in on the platform are recorded and stored on our systems.
                    Most of these recorded activities are only traceable back to your pseudonymous user id.
                    Your pseudonymous user id is linked to your email address, thus making all of your recorded activities traceable back to your personal information.
                </p>
                <p>We use information recorded by the system to develop, improve, and understand the system, perform research and analysis, solicit feedback, perform marketing, and communicate with you about current, potential, and future services, and to assist you in any necessary way related to the services.</p>
                <p>For some of our research and analysis, we use Google Analytics. We anonymize the IP addresses that are collected. Click <a href="https://policies.google.com/technologies/partner-sites" target="_blank">here</a> to see how Google collects and processes data.</p>
                <p>We may use MailChimp to communicate with you. In this case, we would transfer your personal information to MailChimp.</p>
                <p>We also may use other email or messaging/communication providers to initiate communications with you, Demergence personnel, or others, that utilize your personal information, only for the purposes described in this privacy policy.</p>

                <h3>How we protect personal information</h3>

                <p>We strive for reasonably strong security practices to maintain the integrity of your personal information.</p>
                <p>Besides access by MailChimp, Netlify, Prisma, and Stripe in accordance with their privacy practices, all access to personal information is protected by cryptographic secrets and restricted to Demergence personnel with a legitimate need to know.</p>
                <p>We utilize MailChimp to process and/or store personal information. Review their privacy practices <a href="https://mailchimp.com/legal/privacy/" target="_blank">here</a>.</p>
                <p>We utilize Netlify to process and/or store personal information. Review their privacy practices <a href="https://www.netlify.com/privacy/" target="_blank">here</a>.</p>
                <p>We utilize Prisma to process and/or store personal information. Review their privacy practices <a href="https://github.com/prisma/content/blob/master/static/legal/terms.md#privacy-policy" target="_blank">here</a>.</p>
                <p>We utilize Stripe to process and/or store personal information. Review their privacy practices <a href="https://stripe.com/us/privacy/" target="_blank">here</a>.</p>

                <h2>Questions?</h2>
                <p>
                    Demergence
                    <br>
                    <br>
                    819 N 500 E
                    <br>
                    Logan, UT 84321
                    <br>
                    jordanlast@demergence.org
                    <br>
                    801-709-1860
                </p>
            </div>
        `;
    }
}

window.customElements.define('jp-legal-terms-and-privacy', JPLegalTermsAndPrivacy);