import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostCard2({ post, loggedIn }) {

    console.log(post)
    return (
        <div className="card mt-3">
            <div className="row g-0">
        
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">{ post.date_created }</h6>
                        <h5 className="card-title">{ post.title }</h5>
                        <p className="card-text">{ post.content }</p>
                        <Link className='btn btn-info' to={`/`}>Back Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
