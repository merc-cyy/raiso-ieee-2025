import React, {useState } from 'react';


function Posts() {
  // Track which post is expanded (null means no post is expanded)
  const [expandedPost, setExpandedPost] = useState(null);

  // Hardcoded posts array with the desired format
  const posts = [
  {
    id: 1,
    role: 'Animal Shelter Volunteer',
    event: 'Pet Adoption Day',
    organization: 'Happy Tails Shelter',
    description: 'Help care for and find loving homes for our furry friends.',
  },
  {
    id: 2,
    role: 'Kids Camp Mentor',
    event: 'Summer Kids Camp',
    organization: 'Youth Empowerment Center',
    description: 'Guide children through fun, educational activities during camp.',
  },
  {
    id: 3,
    role: 'Healthcare Assistant',
    event: 'Community Health Fair',
    organization: 'HealthFirst',
    description: 'Support healthcare professionals in providing community services.',
  },
  {
    id: 4,
    role: 'Tech Tutor',
    event: 'Digital Literacy Workshop',
    organization: 'Tech4All',
    description: 'Teach basic computer skills to bridge the digital divide.',
  },
  {
    id: 5,
    role: 'Environmental Volunteer',
    event: 'Park Cleanup Day',
    organization: 'Green Earth',
    description: 'Join us in cleaning up local parks and green spaces.',
  },
  {
    id: 6,
    role: 'Community Organizer',
    event: 'Neighborhood Beautification',
    organization: 'Community Cares',
    description: 'Coordinate projects that improve local neighborhoods.',
  },
  {
    id: 7,
    role: 'Food Bank Volunteer',
    event: 'Food Drive & Distribution',
    organization: 'Feeding Hands',
    description: 'Help collect, pack, and distribute food to those in need.',
  },
  {
    id: 8,
    role: 'Arts & Culture Assistant',
    event: 'Local Arts Festival',
    organization: 'Creative City',
    description: 'Support community art events and showcase local talent.',
  },
  {
    id: 9,
    role: 'Sports Mentor',
    event: 'Youth Sports Day',
    organization: 'Active Minds',
    description: 'Coach and mentor young athletes in sports and teamwork.',
  },
  {
    id: 10,
    role: 'Library Assistant',
    event: 'Book Donation Drive',
    organization: 'Community Library',
    description: 'Assist with organizing events that promote literacy and reading.',
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



