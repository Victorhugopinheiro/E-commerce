import { createContext, useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextType {
    authenticated: boolean;
    setAuthenticated: (auth: boolean) => void;
    token?: string | null;
    setToken?: (token: string) => void;



    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (username: string, email: string, password: string) => Promise<void>;
}




export const AuthContext = createContext({} as AuthContextType);



export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(() => {
        const saved = localStorage.getItem("token");
        if (saved) {
            api.defaults.headers.common['Authorization'] = `Bearer ${saved}`
        }

        return saved || null;
    })

    const navigate = useNavigate();



    const signIn = async (email: string, password: string) => {



        try {

            const response = await api.post('/api/users/login', { email, password });
            console.log('SignIn response:', response.data);
            if (response.data.success && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                setAuthenticated(true);
                navigate('/');
            } else {
                localStorage.removeItem('token');
                setAuthenticated(false);
            }

        } catch (error) {
            console.error("Error during sign in:", error);
        }


    }

    const signUp = async (username: string, email: string, password: string,) => {
        try {


            alert('Cadastrando usuário...')
            const response = await api.post('/api/users/register', { email, password, username });

            console.log('SignUp response:', response.data);
            if (response.data.success && response.data.user.token) {
                localStorage.setItem('token', response.data.user.token);
                setToken(response.data.user.token);

                setAuthenticated(true);
                navigate('/');
            } else {
                alert('Erro ao cadastrar usuário. Tente novamente mais tarde.')
                localStorage.removeItem('token');
                setAuthenticated(false);
            }
        } catch (error) {
            alert('Erro ao cadastrar usuário. Tente novamente mais tarde.')
            setToken(null);
            setAuthenticated(false);
            console.error("Error during sign up:", error);
        }
    }

    const signOut = () => {
        toast.success('Deslogado com sucesso!')
        localStorage.removeItem('token');
        setToken(null);
        setAuthenticated(false);
        navigate('/login');


    }

    useEffect(() => {
        if (token) {
            setAuthenticated(true);
            navigate('/');

        } else {
            navigate('/login');
            setAuthenticated(false);
        }

        return () => { };
    }, [])

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, signIn, signOut, signUp, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )

}