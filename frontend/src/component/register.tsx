import netclient from "../utils/netclient";

function Register() {
  let username: string = "";
  let password1: string = "";
  let password2: string = "";
  let role: string = "";

  const handleSubmit = () => {
    console.log(username);
    console.log(password1);
    console.log(password2);
    console.log(role);
    netclient.register({ username: username, password: password1, role: role});
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
                    onChange={(event) => username = event.target.value}
                    placeholder="Username" />

                <input 
                    type="password"
                    className="border border-gray-300 w-full p-3 rounded mb-4"
                    name="password"
                    onChange={(event) => password1 = event.target.value}
                    placeholder="Password" />

                <input 
                    type="password"
                    className="border border-gray-300 w-full p-3 rounded mb-4"
                    name="confirm_password"
                    onChange={(event) => password2 = event.target.value}
                    placeholder="Confirm Password" />

                <select 
                    onChange={(event) => role = event.target.value}
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
