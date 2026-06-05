import { createContext, useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { User } from "@/types/userTypes";
import { set } from "zod";

interface AuthContextType {
    authenticated: boolean;
    setAuthenticated: (auth: boolean) => void;
    
  
    user: User | null;
    setUser: (user: User | null) => void;



    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (username: string, email: string, password: string) => Promise<void>;
}




export const AuthContext = createContext({} as AuthContextType);



export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const navigate = useNavigate();



    const signIn = async (email: string, password: string) => {



        try {

            const response = await api.post('/api/users/login', { email, password });

            if (response.data.success) {
                toast.success('Logado com sucesso!')
                setAuthenticated(true);
                navigate('/');
            } else {
                try {
                    const response = await api.post('/api/users/logout');
                    if (response.data.success) {
                        toast.success('Deslogado com sucesso!')
                    }

                } catch (error) {
                    localStorage.removeItem('token');
                    setAuthenticated(false);
                } finally {
                    setAuthenticated(false);
                }


            }

        } catch (error) {
            console.error("Error during sign in:", error);
        }


    }

    const signUp = async (username: string, email: string, password: string,) => {
        try {



            const response = await api.post('/api/users/register', { email, password, username });


            if (response.data.success) {
                setAuthenticated(true);
                toast.success('Cadastro realizado com sucesso!')
                navigate('/');
            } else {

              signOut()
            }
        } catch (error) {
            setAuthenticated(false);
            console.error("Error during sign up:", error);
        }
    }

    const signOut = async () => {

        try {
            const response = await api.post('/api/users/logout');
            if (response.data.success) {
                toast.success('Deslogado com sucesso!')
                setAuthenticated(false);
                navigate('/login');
            }

        } catch (error) {
           
            setAuthenticated(false);
        } finally {
            setAuthenticated(false);
            setUser(null);
            setAuthenticated(false);
            navigate('/login');
        }


    }

    useEffect(() => {

        const validatingAuth = async () => {
            try {
                setLoading(true);


                const response = await api.get('/api/users/userDetails');

                if (response.data.success) {
                    setAuthenticated(true);
                    setUser(response.data.user);
                    

                }

            } catch (error) {
                console.error("Error validating auth:", error);
                setAuthenticated(false);
                navigate('/login');
            } finally {
                setLoading(false);

            }

        }
        validatingAuth();
        return () => { };
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ authenticated, user, setUser, setAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )

}