// Imports
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

// Types
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; // toda função assíncrona retorna uma promise, e devemos especificar isso no typescript
}

type AuthContextProviderProps = {
    children: ReactNode; // para declarar a tipagem de um children, devemos usar o ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {    

    const [user, setUser] = useState<User>();

    useEffect(() => { // useEffect(() => {Qual função será executada}, [qual informação deve ser monitorada (como um eventListener)]);
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const {displayName, photoURL, uid} = user;

                if (!displayName || !photoURL) {
                throw new Error ('Missing information from Google Account.');
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => { // toda vez que utilizamos um eventListener (useEffect), por boa prática, devemos nos "descadastradar" de todos os eventListeners que usamos
            unsubscribe(); // senão, o eventListener vai causar um erro por continuar rodando
        }
    }, [/* Para disparar apenas uma vez, deixamos o vetor vazio */] );

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)
            
        if (result.user) {
        const {displayName, photoURL, uid} = result.user;

        if (!displayName || !photoURL) {
            throw new Error ('Missing information from Google Account.');
        }

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        })
        }
    };

    return (        
        <AuthContext.Provider value={ { user, signInWithGoogle } } >
            {props.children}
        </AuthContext.Provider>
    );
};