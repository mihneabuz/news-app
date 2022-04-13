const apiGateway = "http://localhost:3000";

const netclient = {
  register: async (args: { username: string, password: string, type: string }) => {
    const result = await fetch(
      apiGateway + '/user/register',
      {
        method: 'POST',
        body: JSON.stringify(args),
      }
    );
    return await result.json();
  },

  login: async (args: { username: string, password: string }) => {
    const result = await fetch(
      apiGateway + '/user/login',
      {
        method: 'POST',
        body: JSON.stringify(args),
      }
    );
    return await result.json();
  },

  getPosts: async (jwt: string) => {
    const result = await fetch(
      apiGateway + '/post',
      { 
        headers: { 'Authorization': `Bearer ${jwt}` }
      }
    );

    return await result.json();
  },

  createPost: async (jwt: string, args: { title: string, content: string }) => {
    const result = await fetch(
      apiGateway + '/post/create',
      { 
        method: 'POST',
        body: JSON.stringify(args),
        headers: { 'Authorization': `Bearer ${jwt}` }
      }
    );
    return await result.json();
  }
};

export default netclient;
