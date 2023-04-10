import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function EditPost({ loggedIn, flashMessage }) {
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

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to edit a new post', 'danger');
            navigate('/login');
        }
    })

    async function handleSubmit(e){
        e.preventDefault();

        // Get the data from the form
        let title = e.target.title.value;
        let content = e.target.body.value;

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        // Set up the request body
        let requestBody = JSON.stringify({ title, content })

        // Make the fetch request
        let response = await fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: requestBody
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been edited`, 'success');
            navigate('/');
        };
    };

    return (
        <>
            <h3 className="text-center">Edit A Post!</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" className="form-control my-3" />
                    <textarea name="body" className="form-control my-3" />
                    <input type="submit" value="Edit Post" className='btn btn-success w-100' />
                </div>
            </form>
        </>
    )
}
