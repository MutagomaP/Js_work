import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UserList } from './components/UserList'; // Adjust the path as needed
import { Form } from './components/Form'; // Adjust the path as needed
import Context from './services/userListData/Context';

const App = () => {
  const [userListData, setUserListData] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);

  const fetchUserListData = useCallback(async () => {
    setUserListLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/getUsers'); // Adjust the endpoint as needed
      setUserListData(response.data.allUsers);
      console.log(response.data,"response===");
    } catch (error) {
      console.error('Error fetching user list data:', error);
    } finally {
      setUserListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserListData();
  }, [fetchUserListData]);

  const handleUserCreated = (newUser) => {
    setUserListData((prevData) => [...prevData, newUser]);
  };

  return (
    <Context.Provider value={{ data: userListData, fetchUserListData, userListLoading, setUserListLoading, handleUserCreated }}>
      <div className="App">
        <Form />
        <UserList />
      </div>
    </Context.Provider>
  );
};

export default App;
