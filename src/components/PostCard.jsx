import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, loggedIn }) {


    const [me, setMe] = useState([null])
    let token = localStorage.getItem('token');

    // Set up the request headers
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    useEffect(() => {

        // Define async function
        async function fetchUserData(){
            let response = await fetch('https://kekambas-blog-api.onrender.com/api/me', {
                headers: myHeaders
            });
            let user = await response.json()
            setMe(user);
        };
        // Execute async function
        if (loggedIn){
        fetchUserData();}
    }, [me.username]);


    return (
        <div className="card mt-3">
            <div className="row g-0">
        
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">{ post.date_created }</h6>
                        <h5 className="card-title">{ post.title }</h5>
                        <h6 className="card-subtitle">By: { post.author.username }</h6>
                        <p className="card-text">{ post.content }</p>
                        <Link className='btn btn-info' to={`/posts/${post.id}`}>See More</Link>
                        {me.username == post.author.username ? (
                        <>
                        <Link className='btn btn-success' to={`/posts/${post.id}/Edit`}>Edit</Link>
                        <Link className='btn btn-danger' to={`/posts/${post.id}/Delete`}>Delete</Link>
                        </>
                        ) : (
                        <>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
