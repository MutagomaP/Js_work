import React, { useState, useCallback } from "react";
import axios from 'axios'
import PackageContext from './Context'

const Provider = (props) => {
    
    const [userListData, setUserListData] = useState([])
    const [userListLoading, setUserListLoading] = useState(false);
    
    return(
        <PackageContext.Provider value={{
            data:userListData,
            fetchUserListData: useCallback(async () => {
              try {                
                setUserListLoading(true);
                await axios.get("http://localhost:5000/getUsers")
                .then((userListResp)=>{
                  if(userListResp && userListResp.data && userListResp.data.allUsers){
                    if(userListResp.data.allUsers.length>0){
                      setUserListData(userListResp.data.allUsers);
                    }else{
                      setUserListData([]);
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                  setUserListLoading(false);
                  throw error;
                })
                setUserListLoading(false);
              } catch (error) {
                console.log(error)
              }
          }, []),
          userListLoading:userListLoading,
          setUserListLoading:(val)=>{setUserListLoading(val)}
        }}>
            {props.children}
        </PackageContext.Provider>
    );
}

export default Provider;