import { createContext, useState } from 'react'
import { UserProps } from "../utils/types.module";
import { useUserDatabase } from '../database/useUserDatabase';

type AuthContextProps = {
    user:UserProps | null;
    isAuthenticated: boolean;
    signIn:  (email: string, senha: string ) => Promise<any>;
    signOut: ()=> void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}:any)=>{
    const [user, setUser] = useState<any | null>(null)
    const { readUser }= useUserDatabase()
    const [isAuthenticated, setIsAutenticated ] = useState(false);

    const signIn = async (email:any, senha:any)=>{
        try{
            const user = await readUser(email, senha); 
            if (user) {
                setIsAutenticated(true)
                setUser(user)
                return { success: true, user }; 
            } else {
                return { success: false, error: 'Usuário não encontrado ou senha incorreta.' };
            }
        } catch (error) {
            return { success: false, error: 'Erro no processo de login.' };
        }
    };

    const signOut = () => {
        setUser(null); 
        setIsAutenticated(false)
    };
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};