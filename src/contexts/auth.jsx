import { createContext, useState } from 'react'

export const AuthContext = createContext({})

export type AuthProps = {
    children?: React.ReactNode
}


function AuthProvider({children}: AuthProps){
    const [tasktData, setTaskData] = useState({});
    function updateTaskData(data){
        setTaskData(data);
    }

    return(
        <AuthContext.Provider value={tasktData, updateTaskData}>
            {children}
        </AuthContext.Provider>
    )
}
  
export default AuthProvider;
