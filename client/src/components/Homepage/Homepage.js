import logo from '../../image/logo.svg';
import imageGit from '../../image/git.png';
import React, { useState, useEffect } from "react";
import './style.scss';
import fetchFromApi from "../../lib/fetch";


function Homepage(props) {
    
    const [post, setPost] = useState([]);
    /*Effect*/
    useEffect(() => {
      getPosts();
    }, []);

    // Get Post
    const getPosts = () => {
    fetchFromApi("GET", "/api/posts", {}, false).then(
        (data) => {
            console.log(data)
            if (Array.isArray(data.posts)) {
                setPost(data.posts);
                }
            },
            (error) => {     
            console.error("An error has occured while fetching posts");
            }
        );
    }

    const displayPost=()=>{
        return post.map((post, index) => {
            return (
                <li key={index}>
                <p className="authorName">{post.author}</p>
                <p className="content">{post.content}</p>
                </li>
            );
        });
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <img src={imageGit} alt="Image git"/>
                <p>
                    Boilerplate MERN
                </p>
                <div><p>liste</p>{displayPost()}</div>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a>
            </header>
        </div>
    );
}

export default Homepage;