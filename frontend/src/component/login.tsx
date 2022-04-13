import { useState } from 'react';
import { useDispatch } from 'react-redux';
import netclient from "../utils/netclient";

import { logIn } from "../state/userSlice";

function Login() {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({username: "", password: ""});
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (userData.username === "" || userData.password === "") {
      setMessage("Complete all fields!");
      return;
    }

    const res = await netclient.login({ username: userData.username, password: userData.password });
    if (!res.success) {
      setMessage(res.message);
    } else {
      setMessage(res.message);
      setUserData({ username: "", password: "" })
      dispatch(logIn(res.jwt));
    }
  };

  return (
    <div className="bg-grey-lighter py-10 px-5 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md w-full">
                <h1 className="mb-8 text-3xl text-center"> Login </h1>
                <input 
                    type="text"
                    className="border border-gray-300 w-full p-3 rounded mb-4"
                    name="username"
                    value={userData.username}
                    onChange={(event) => setUserData(prev => ({...prev, username: event.target.value}))}
                    placeholder="Username" />

                <input 
                    type="password"
                    className="border border-gray-300 w-full p-3 rounded mb-4"
                    name="password"
                    value={userData.password}
                    onChange={(event) => setUserData(prev => ({...prev, password: event.target.value}))}
                    placeholder="Password" />

                <div className="container items-center flex flex-col h-8">
                  <h3 className="text-red-400"> {message} </h3>
                </div>          

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full text-center py-3 rounded bg-sky-400 text-gray-700 hover:bg-sky-300 hover:text-gray-800 my-1"
                >Login</button>
            </div>
        </div>
    </div>
  );
}

export default Login;
