import React, {useEffect, useState } from 'react';


function Posts() {
  // Track which post is expanded (null means no post is expanded)
  const [expandedPost, setExpandedPost] = useState(null);

  // Hardcoded posts array with the desired format
  const posts = [
    {
      id: 1,
      role: 'Dog washers needed',
      event: 'Evanston Dog competition',
      organization: 'Evanston Dogs',
      description: 'A day of community for grooming dogs and playing',
    },
    {
      id: 2,
      role: 'Dog walkers wanted',
      event: 'City Canine Marathon',
      organization: 'Urban Paws',
      description: 'Join us for an energetic walk to support local shelters',
    },
    {
      id: 3,
      role: 'Dog trainers required',
      event: 'Paws & Tricks Expo',
      organization: 'Happy Hounds',
      description: 'A fun event dedicated to dog training and community bonding',
    },
    {
      id: 4,
      role: 'Volunteer for dog adoption events',
      event: 'Furry Friends Fair',
      organization: 'Rescue Rovers',
      description: 'Help connect dogs with loving homes at our annual fair',
    },
    {
      id: 5,
      role: 'Dog playgroup organizers',
      event: 'Puppy Playtime',
      organization: 'Canine Club',
      description: 'A relaxed day of socializing and play for dogs and their owners',
    },
  ];

  // Toggle the expanded state for a post
  const toggleExpand = (id) => {
    if (expandedPost === id) {
      setExpandedPost(null);
    } else {
      setExpandedPost(id);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='custom-posts-title'>Volunteer Opportunities</h2>
        {posts.map((post) => (
            <div key={post.id} className="card my-4 p-3 custom-card-bg-color custom-border">
                <div className="d-flex justify-content-center align-items-center">
                    <div className='d-flex flex-column align-items-center'>
                        <h5 className='custom-job-role'>{post.role}</h5>
                        <p className="mb-1">
                            <a class="nav-link active" aria-current="page" href="#"> {post.event} </a>
                        </p>
                        <p className="mb-1">
                            <a class="nav-link active" aria-current="page" href="#"> {post.organization} </a>
                        </p>
                    </div>
                <button className="btn btn-link" onClick={() => toggleExpand(post.id)}>
                    {/* Using Bootstrap Icons for the arrow; adjust class names if needed */}
                {expandedPost === post.id ? (
                    <i className="bi bi-caret-up-fill custom-arrow"></i>//if expanded show up arrow
                ) : (
                    <i className="bi bi-caret-down-fill custom-arrow"></i>//else show down arrow
                )}
                </button>
            </div>
                {expandedPost === post.id && (
                <div className='d-flex flex-column'>
                    <p className="mt-2 custom-description-color">{post.description}</p>
                    <button className="btn btn-primary w-auto custom-btn-post-color">I am interested!</button>
                </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Posts;



