import axios from "axios";
import { URL } from "./../constant/index";

const client = axios.create({ baseURL: URL });

export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer token`

    const onSuccess = (response) => response
    const onError = (error) => error

    return client(options).then(onSuccess).catch(onError)
};
