import React, { useState } from 'react'
import axios from 'axios'
import Context from '../services/userListData/Context';
import { useContext } from 'react';

export const Form = () => {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [backendRespMsg, setBackendRespMsg] = useState("");
    const {fetchUserListData} = useContext(Context);
    
    // To get the data from Form and send it to backend to save it in DB
    const submitUserData = async () => {
        try {
            if(userName && userEmail){
                const data = {
                    name: userName,
                    email: userEmail,
                }
                const userResponse = await axios.post("http://localhost:5000/createUser/", data)
                .then((resp)=>{
                    fetchUserListData();
                    return resp;
                })
                .catch(error => {
                    if(error.response && error.response.data)
                        setBackendRespMsg (error.response.data);
                    else
                        setBackendRespMsg(error.message);
                    console.log(error);
                });
                if(userResponse && userResponse.data && userResponse.data.message)
                    setBackendRespMsg(userResponse.data.message);
            }else{
                setBackendRespMsg("Name and Email cannot be empty! Please fill them and try again.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Handles the submit event
    const handleSubmit = (event) => {
        event.preventDefault();
        submitUserData();
        // resets userName and userEmail input boxes
        setUserName("");
        setUserEmail("");
    }
    return (
        <div>
            <form className="body-font relative" onSubmit={handleSubmit}>
                <div className="container px-5 pt-12 pb-6 mx-auto">
                    <div className="flex flex-col text-center w-full mb-6">
                        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold title-font mb-4 underline underline-offset-4 text-white">Create&nbsp;User</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-lg text-white">Share your name &amp; email so we can add you to our User-List</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-lg text-white">Name</label>
                                    <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-white focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-[#042933] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={userName}
                                    onChange={(event) => {setUserName(event.target.value)}} />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-lg text-white">Email</label>
                                    <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-white focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-[#042933] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    value={userEmail}
                                    onChange={(event) => {setUserEmail(event.target.value)}} />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button type='submit' className="flex mx-auto bg-white text-[#042933] border-2 py-2 px-8 focus:outline-none hover:bg-[#042933] hover:border-white hover:text-white rounded text-lg">Submit</button>
                            </div>
                            {backendRespMsg?(
                                <div className="p-2 w-full py-4 mt-8 border-y border-gray-200 text-center">
                                    <p>{backendRespMsg}</p>
                                </div>
                            ):(
                                <div className="p-2 w-full py-4 mt-8 border-y border-gray-200 text-center text-white">
                                    <p> My Name: Anne Marie</p>
                                    <a className="text-white" href='mailto:sidp0008@gmail.com'>My Email Id: annm0008@gmail.com</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
