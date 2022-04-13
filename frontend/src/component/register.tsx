import { useState } from 'react';
import netclient from "../utils/netclient";

function Register() {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({username: "", password1: "", password2: "", role: ""});

  const handleSubmit = async () => {
    if (userData.username === "" || userData.password1 === "" || userData.password2 === "" || userData.role === "") {
      setMessage("Complete all fields!");
      return;
    }

    if (userData.password1 !== userData.password2) {
      setMessage("Passwords do not match!");
      return;
    }

    const res = await netclient.register({ username: userData.username, password: userData.password1, type: userData.role});

    if (!res.success) {
      setMessage(res.message);
    } else {
      setUserData({username: "", password1: "", password2: "", role: ""});
      setMessage("ok");
    }
  };

  return (
    <div className="bg-grey-lighter py-10 px-5 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md w-full">
                <h1 className="mb-8 text-3xl text-center">Register</h1>
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
                    value={userData.password1}
                    onChange={(event) => setUserData(prev => ({...prev, password1: event.target.value}))}
                    placeholder="Password" />

                <input 
                    type="password"
                    className="border border-gray-300 w-full p-3 rounded mb-4"
                    name="confirm_password"
                    value={userData.password2}
                    onChange={(event) => setUserData(prev => ({...prev, password2: event.target.value}))}
                    placeholder="Confirm Password" />

                <select 
                    onChange={(event) => setUserData(prev => ({...prev, role: event.target.value}))}
                    value={userData.role}
                    className="form-select appearance-none
                    w-full
                    p-3
                    text-gray-600
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    mb-4
                    focus:border-blue-600">
                    <option value="" disabled selected hidden> Role </option>
                    <option value="reader"> Reader </option>
                    <option value="journalist"> Journalist </option>
                </select>

                <div className="container items-center flex flex-col h-8">
                  <h3 className="text-red-400"> {message} </h3>
                </div>          

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full text-center py-3 rounded bg-sky-400 text-gray-700 hover:bg-sky-300 hover:text-gray-800 my-1"
                >Create Account</button>
            </div>
        </div>
    </div>
  );
}

export default Register;
