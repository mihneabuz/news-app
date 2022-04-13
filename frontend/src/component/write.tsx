import { useState } from 'react';
import { useSelector } from 'react-redux';
import netclient from '../utils/netclient';

function Write() {
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({ title: "", content: "" });
  const jwt = useSelector((state: any) => state.user.jwt);

  const handlePost = async () => {
    console.log(post.title);
    console.log(post.content);

    if (post.title === "" || post.content === "") {
      setMessage("Complete all fields!");
      return;
    }

    const res = await netclient.createPost(jwt, post);

    console.log(res);

    if (res.success) {
      setMessage(res.message);
      setPost({ title: "", content: "" });
    } else {
      setMessage(res.message);
    }
  }

  return (
    <div className="grid my-20 place-items-center">
      <div className="max-w-lg shadow-lg rounded bg-gray-100 p-3">
        <div className="mb-2">
          <label htmlFor="comment" className="text-lg text-gray-600 p-2">Create News</label>
          <textarea 
            className="w-full h-10 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder="Title"
            value={post.title}
            onChange={(event) => setPost((post) => ({ title: event.target.value, content: post.content }))}
          />
          <textarea
            className="w-full h-40 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder="Content"
            value={post.content}
            onChange={(event) => setPost((post) => ({ title: post.title, content: event.target.value }))}
          />
        </div>
        <div className="container items-center flex flex-col h-6">
          <h3 className="text-red-400"> {message} </h3>
        </div>          
        <button onClick={handlePost} className="mx-2 px-4 py-2 text-sm text-gray-100 bg-sky-600 rounded">Post</button>
      </div>
    </div>
  );
}

export default Write;
