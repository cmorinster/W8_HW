import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DeletePost(loggedIn, flashMessage) {
    
    
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
            flashMessage('You must be logged in to delete a new post', 'danger');
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



        // Make the fetch request
        let response = await fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`, {
            method: 'DELETE',
            headers: myHeaders,
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been deleted`, 'warning');
            navigate('/');
        };
    };

    return (
        <>
            <h3 className="text-center">Would you like to Delete This Post?</h3>
                <div className="col-md-8">
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{ post.title }</h5>
                        <p className="card-text">{ post.content }</p>
                        <Link className='btn btn-outline-primary' to={`/`}>Never Mind, Let's Go Home</Link>
                    </div>

                </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <input type="submit" value="Delete Post" className='btn btn-outline-danger w-25' />
                        </div>
                    </form>
                </div>
        </>
    )
}
