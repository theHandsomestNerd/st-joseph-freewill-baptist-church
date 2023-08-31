import clientUtils from "./clientUtils";
import {SanityColdLead} from "../../../../common/sanityIo/Types";

const createLead = (lead: SanityColdLead) => {
    return fetch("/collect-email-address" ?? "",
        {
            method: 'POST',
            body: JSON.stringify(lead),
        },
    )
        .then((response: any) => {
            return clientUtils.processResponse(response, 'ColdLead');
        })
        .catch((e: any) => {
            // console.error(LOG, 'ERROR', 'error', e);
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject({attempt: Error(e)});
        });
};
const sendBusinessCardEmail = (lead: SanityColdLead) => {
    return fetch("/send-email-resume" ?? "",
        {
            method: 'POST',
            body: JSON.stringify(lead),
        },
    )
        .then((response: any) => {
            return clientUtils.processResponse(response, 'EmailedResume');
        })
        .catch((e: any) => {
            // console.error(LOG, 'ERROR', 'error', e);
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject({attempt: Error(e)});
        });
};

const getInstagramImage = async (imageUrl: string, index:number) => {
    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    console.log("Waiting ",1000*(index+1))
    await timeout(1000*(index+1));

    return fetch("/get-insta-image" ?? "",
        {
            method: 'POST',
            body: JSON.stringify({url: imageUrl}),
        },
    )
        .then((response: any) => {
            return clientUtils.processResponse(response, 'imageResponse');
        })
        .catch((e: any) => {
            // console.error(LOG, 'ERROR', 'error', e);
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject({attempt: Error(e)});
        });
};
export default {createLead, sendBusinessCardEmail, getInstagramImage}