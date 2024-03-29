import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient( ctx = undefined ){
    let cookies = parseCookies(ctx);
    
    let host;
    try{ 
        host = window.location.origin; 
    }catch(err){
        host = "http://localhost:3000";
    }
    

    const api = axios.create({
        baseURL: host,
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    },(error: AxiosError) => {
        if(error.response?.status === 401){
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