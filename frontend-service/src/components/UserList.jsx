import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react'
import Context from '../services/userListData/Context';
import {ThreeDots} from 'react-loader-spinner';

export const UserList = () => {
  const userListData = useContext(Context).data;
  const [data,setData] = useState([]);

  const {fetchUserListData,userListLoading,setUserListLoading} = useContext(Context);

  useEffect(() => {
    fetchUserListData();
  }, [fetchUserListData])

  // edit user data
  const editUserData = async (userId) => {
    try {
      const userName = prompt("Enter a name to update");
      const userEmail = prompt("Enter an Email to update");
      setUserListLoading(true);
      if(!(userName && userEmail)){
        setUserListLoading(false);
        alert("Please enter both name & email");
      }else{
        const editUserResp = await axios.put(`http://localhost:5000/editUser/${userId}`,{
          name: userName,
          email: userEmail,
        })
        .then((resp)=>{
          fetchUserListData();
          return resp;
        })
        .catch(error => {
          setUserListLoading(false);
          alert(error.message);
        })
        console.log(editUserResp.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // delete user
  const deleteUserData = async (userId) => {
    try {
      const confirmDelete = window.confirm("Please click OK to confirm and delete the selected user");
      setUserListLoading(true);
      if(confirmDelete){
        const deleteUserResp = await axios.delete(`http://localhost:5000/deleteUser/${userId}`)
        .then((resp)=>{
          fetchUserListData();
          return resp;
        })
        .catch(error => {
          setUserListLoading(false);
          alert(error.message);
        });
        console.log(deleteUserResp.data);
      }else{
        setUserListLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
const getAllUser = async()=>{
  try{
    const {data} = await axios.get("http://localhost:5000/getUsers");
    console.log(data,"Data====");

    getAllUser()
  }
  catch(err){
    console.log(err);
  }
}
  },[])
  
  return (
    <>
    <div className='w-full lg:w-4/5 mx-auto'>
      <div className="container p-2 mx-auto sm:p-4 text-white">
        <div className="flex flex-col text-center w-full mb-3 md:mb-6">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold title-font underline underline-offset-4">User List</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            {/* UserList Header */}
            {data ?(
              <thead>
                <tr className="bg-white text-[#042933] text-xs md:text-lg">
                  <th className="py-3 px-1 text-center hidden md:table-cell">
                    <font style={{verticalAlign: "inherit"}}>
                      <font style={{verticalAlign: "inherit"}}>Sr. No.</font>
                    </font>
                  </th>
                  <th className="py-3 px-1 text-center">
                    <font style={{verticalAlign: "inherit"}}>
                      <font style={{verticalAlign: "inherit"}}>Name</font>
                    </font>
                  </th>
                  <th className="py-3 px-1 text-center">
                    <font style={{verticalAlign: "inherit"}}>
                      <font style={{verticalAlign: "inherit"}}>Email</font>
                    </font>
                  </th>
                  <th className="py-3 px-1 text-center">
                      <font style={{verticalAlign: "inherit"}}>
                        <font style={{verticalAlign: "inherit"}}>Edit</font>
                      </font>
                  </th>
                  <th className="py-3 px-1 text-center">
                      <font style={{verticalAlign: "inherit"}}>
                        <font style={{verticalAlign: "inherit"}}>Delete</font>
                      </font>
                  </th>
                </tr>
              </thead>
            ):
            (
              (userListLoading)?(
                <thead
                  style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
               <tr><td><ThreeDots type="ThreeDots" color="#FFF" height="100" width="100" /></td></tr>
            </thead>
              ):
              
              (
                <thead className='bg-white text-[#042933] text-xs md:text-lg text-center p-2 rounded'>
                <tr><td>No User exists. Please try adding one by filling above form.</td></tr>
              </thead>
              ))
            }
            {/* User Items are shown if userListData is not empty*/}
            {(userListData && userListData.length && !userListLoading)?(
              userListData.map((user,index) => (
                <tbody className="border-b bg-[#042933] border-white text-xs md:text-base" key={user._id}>
                  <tr>
                    <td className="px-2 font-medium text-white text-center hidden md:table-cell">
                      <font style={{verticalAlign: "inherit"}}>
                        <font style={{verticalAlign: "inherit"}}>{index+1}</font>
                      </font>
                    </td>
                    <td className="px-2 py-2 text-center">
                      <p className='whitespace-normal'>
                        
                        <font style={{verticalAlign: "inherit"}}>
                          <font style={{verticalAlign: "inherit"}}>{user.name}</font>
                        </font>
                      </p>
                    </td>
                    <td className="px-1 md:px-2 py-2 text-center">
                      <span>
                        <font style={{verticalAlign: "inherit"}}>
                          <font style={{verticalAlign: "inherit"}}>{user.email}</font>
                        </font>
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <div className="p-2 w-full">
                        <button type='button' className="flex mx-auto bg-white text-[#042933] border-2 py-2 px-2 md:px-8 focus:outline-none hover:bg-[#042933] hover:border-white hover:text-white rounded text-xs md:text-base" onClick={() => editUserData(user._id)}>Edit</button>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="p-2 w-full">
                        <button type='button' className="flex mx-auto bg-white text-[#042933] border-2 py-2 px-2 md:px-8 focus:outline-none hover:bg-[#042933] hover:border-white hover:text-white rounded text-xs md:text-base" onClick={() => deleteUserData(user._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ):(
              <tbody></tbody>
            )}
          </table>
        </div>
      </div>
    </div>
    </>
  )
}
