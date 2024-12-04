
import React,{ useState,useContext,createContext, ReactNode } from "react";


type Role="mod" | "admin" | "user";


interface User {
        _id:string;
        username:string;
        email:string;
        password:string;
        role: Role;
}

interface UserContextType {
    user:User;

    save:(user:User)=>boolean;
    
}


const userContext = createContext<UserContextType | null>(null);


export const UserProvider:React.FC<{children: ReactNode}> = ({children})=>{
    

    const [user,setUser] = useState<User | null>(null);
 
    const save=(user:User)=>{
        
        setUser(user)

        return true
    }



    return (<userContext.Provider
        value={{
            user,
            save
        }}
    >
        {children}
    </userContext.Provider>)
    
}