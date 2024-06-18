/*import React from 'react';

export default React.createContext();*/
import axios from 'axios';
import { createContext, useState } from 'react';

const Context = createContext(null);
const ContextProvider = ({children})=>{
    const [isLoading,setIsLoading] = useState(false);
    const fetcher = async()=>{
        try{
            const resp = await axios.get("http://localhost:5000/getUsers");
            console.log(resp.data,"data from response===========");

        }
        catch(err){
            console.log(err);
        }
    }
    const [data,setData] = useState([])
    return(
        <Context.Provider
        value={{
            isLoading,data,
            fetcher
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context;
