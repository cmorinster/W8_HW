import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard2 from '../components/PostCard2';

export default function SinglePost({loggedIn}) {
    const params = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data);
            })
    }, [params.postId])
    
    
    return (
        <div>
            <PostCard2 post={post}/>
        </div>
    )
}
