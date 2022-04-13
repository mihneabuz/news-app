
const apiGateway = "http://localhost:3000";

const netclient = {
  register: async (args: { username: string, password: string, role: string }) => {
    const result = await fetch(
      apiGateway + '/user/login',
      {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {'Content-Type': 'application/json'}
      }
    )
    .then(result => console.log(result))
    .catch(reason => console.warn(reason)); 
  }
};

export default netclient;
