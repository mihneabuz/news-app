import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BiRefresh } from 'react-icons/bi';

import netclient from '../utils/netclient';

type Post = { title: string, content: string, tags: [string], authorUsername: string } 

function Card(title: string, content: string, author: string, tags: [string]) {
  return (
    <div className="rounded overflow-hidden shadow-lg my-4 w-3/4 bg-gray-100">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2"> {title} </div>
        <div className="font-normal mb-2"> {author} </div>
        <p className="text-gray-700 text-base"> {content} </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {
          tags.map(tag => 
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> {`#${tag}`}</span>
          )
        }
      </div>
    </div>
  )  
}

function Browse() {
  const jwt = useSelector((state: any) => state.user.jwt);
  const [posts, setPosts] = useState({ received: false, arr: [] });

  if (posts.received === false) {
    netclient.getPosts(jwt)
      .then((res) => {
          console.log(res);
          setPosts({ received: true, arr: res.posts });
        })
      .catch(reason => console.log(reason))
  }

  return (
    <div className="bg-grey-lighter py-10 px-5 min-h-screen flex flex-col">
      <div className="container max-w mx-auto flex-1 flex flex-col items-center justify-start px-2">
        <BiRefresh 
          size="2em"
          className="translate-y-1 hover:translate-y-0 hover:skew-y-3" 
          onClick={() => { setPosts({ received: false, arr: [] }) }}
        />
        { posts.arr.map((post: Post) => Card(post.title, post.content, post.authorUsername, post.tags)) }
      </div>
    </div>
  )
}

export default Browse;
