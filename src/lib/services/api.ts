import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify';
import { AuthTokenError } from './errors/AuthTokenError'

export function setupAPIClient( ctx = undefined ){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    },(error: AxiosError) => {
        if(error.response?.status === 401){
            //Qualquer error 401 devemos deslogar o usuário
            if (typeof window != undefined){
                toast.error("Você não tem autorização para acessar essa informação.");
            }else{
                return Promise.reject(new AuthTokenError());
            }
        }

        return Promise.reject(error);
    })
    return api;
}