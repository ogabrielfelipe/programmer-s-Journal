"use client";
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'

import {api} from "./services/apiClient"


type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: ( credentials: SignInProps ) => Promise<void>;
    singUp: ( credentials: SingUpProps ) => Promise<void>;
    signOut: () => void;
}

type UserProps  = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

type SignInProps = {
    emailReq: string;
    password: string;
}

type SingUpProps = {
    name: string;
    email: string;
    password: string;
}


type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    const router = useRouter();
    try{
        destroyCookie(undefined, '@nextauth.token')
        router.push('/')
    }catch{
        console.log('Sign out Error')
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [ user, setUser ] = useState<UserProps>()
    const isAuthenticated = !!user; // !! => Converte em boolean (se estiver vazio fica "false")

    const router = useRouter();

    useEffect( () => {
        const {'@nextauth.token': token} = parseCookies(null);
        if(token){
            api.get('/api/user/session')
            .then( response => {
                const {id, email, firstName, lastName} = response.data;
                setUser({
                    id,
                    email,
                    firstName,
                    lastName                    
                })
            })
            .catch(() =>{
                signOut();
            })
        }else{
            router.push('/')
        }

    }, [] )

    async function signIn({emailReq, password}: SignInProps){
        try{
            const response = await api.post('api/user/auth', {
                email: emailReq,
                password
            })

            const {id, email, token} = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 15, // Expira em 15d 
                path: "/" // Quais caminhos terão acesso ao cookie
            })
            setUser({
                id,
                email
            })


            //Passar para as próximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            

            //Redirecionar o user para /dashboard
            router.push('/home')
        
        }catch(err){
            toast.error('Erro ao acessar!')
            //console.log("Erro ao acessar ", err)
        }
    }

   async function singUp({name, email, password}: SingUpProps) {
    try{
        /*const response = await api.post('/users', {
            name, 
            email,
            password
        })

        toast.success('Conta cadastrada com sucesso!')
        Router.push('/')
*/
    }catch(err){
        toast.error('Erro ao Cadastrar!')
        //console.log("Erro ao cadastrar ", err)
    }
   } 

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, singUp }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)