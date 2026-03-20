import { useState, useEffect } from 'react';
import './App.css';


const Posts = () => {

    // Komponentin tilan määritys
    const [posts, setPosts] = useState([])

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json()) // muutetaan json-data javascript-muotoon
      .then(oliot => setPosts(oliot)) 
    },[]
    )

  return (
    <>
        <h2>Posts from Typicode</h2>

        {
          posts && posts.map(p =>
            <p>{p.title}</p>


          )
        }


    </>
  );
}

export default Posts;