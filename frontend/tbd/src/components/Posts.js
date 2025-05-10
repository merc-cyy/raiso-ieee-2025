import React, { useEffect, useState, useMemo } from 'react';
import '../Posts.css';

function Posts() {
  const authToken = localStorage.getItem('authToken');
  const storedUserAuthData = localStorage.getItem('userAuthData');
  const [interests, setInterests] = useState('');
  const [newinterest, setNewInterest] = useState('');
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const backendApiUrl = 'https://backend-ieee.onrender.com';
  const fastApiUrl = 'https://mldsnuvolunteers-957655660599.us-central1.run.app';
 

  const [likedJobs, setLikedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const itemsPerPage = 6;

  useEffect(() => {
    if (storedUserAuthData && !userId) {
      try {
        const userAuthData = JSON.parse(storedUserAuthData);
        setUserId(userAuthData?.id);
      } catch (error) {
        console.error("Error parsing userAuthData:", error);
      }
    }
  }, [storedUserAuthData]);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      console.log("Trying to fetch jobs")
      if (userId && likedJobs.length === 0) {
        try {
          const res = await fetch(`${backendApiUrl}/interests/liked/ids/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setLikedJobs(data);
          }
        } catch (error) {
          console.error("Error fetching liked jobs:", error);
        }
      }
    };

    const fetchAppliedJobs = async () => {
      if (userId && appliedJobs.length === 0) {
        try {
          console.log("Trying to fetch jobs")
          const res = await fetch(`${backendApiUrl}/interests/applied/ids/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setAppliedJobs(data);
          }
        } catch (error) {
          console.error("Error fetching applied jobs:", error);
        }
      }
    };

    if (userId){
    fetchLikedJobs();
    fetchAppliedJobs();}
  }, [userId]);

  const updateInterestInDB = async (jobId, actionType) => {
    if (userId) {
      try {
        const res = await fetch(`${backendApiUrl}/interests/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, job_id: jobId, type: actionType })
        });
        if (res.ok) {
          if (actionType === 'like' && !likedJobs.includes(jobId)) {
            setLikedJobs(prev => [...prev, jobId]);
          } else if (actionType === 'apply' && !appliedJobs.includes(jobId)) {
            setAppliedJobs(prev => [...prev, jobId]);
          }
        }
      } catch (error) {
        console.error(`${actionType} Action Failed`, error);
      }
    }
  };

  const handleApply = async (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      await updateInterestInDB(jobId, 'apply');
    }
  };

  const handleLike = async (jobId) => {
    if (!likedJobs.includes(jobId)) {
      await updateInterestInDB(jobId, 'like');
    }
  };

  const isJobLiked = (jobId) => likedJobs.includes(jobId);
  const isJobApplied = (jobId) => appliedJobs.includes(jobId);
  const toggleExpand = (id) => setExpandedJobId(prevId => (prevId === id ? null : id));

  const backupJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendApiUrl}/posts/?limit=250`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const prioritizedJobs = data.sort((a, b) => {
        const sponsor = "MEALS ON WHEELS NORTHEASTERN ILLINOIS";
        return (a.organization === sponsor ? -1 : b.organization === sponsor ? 1 : 0);
      });
      setAllJobs(prioritizedJobs);
    } catch (error) {
      setError(error.message);
      setAllJobs([]);
    } finally { 
      setLoading(false);
    }
  };

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (storedUserAuthData) {
      try {
        const userAuthData = JSON.parse(storedUserAuthData);
        setUserId(userAuthData?.id);
        setFirstName(userAuthData?.first_name || '');
      } catch (error) {
        console.error("Error parsing userAuthData:", error);
      }
    }
  }, [storedUserAuthData]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        await backupJobs();
      } catch (error) {
        setAllJobs([]);
      } finally {
        setLoading(false);
      }
    };
    if (userId && !newinterest && recommendedJobs.length === 0) {
      fetchAllJobs();
    }
  }, [userId]);

  const filteredJobs = useMemo(() => {
    return allJobs
      .filter(job => !appliedJobs.includes(job.id) || job.organization === 'MEALS ON WHEELS NORTHEASTERN ILLINOIS')
      .filter(job => {
        const term = searchTerm.toLowerCase();
        return (
          job.title.toLowerCase().includes(term) ||
          job.organization.toLowerCase().includes(term) ||
          job.skills?.toLowerCase().includes(term) ||
          job.description?.toLowerCase().includes(term)
        );
      });
  }, [allJobs, appliedJobs, searchTerm]);

  const generateJobs = async (e) => {
    e.preventDefault();
    console.log("GENERATE FUNCTION WORKING")
  
    try {
      
      const res = await fetch(`${fastApiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: newinterest }),
      });
  
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
      const data = await res.json();
      console.log("RECOMMENDED JOBS WORKING")
  
      const sponsor = "MEALS ON WHEELS NORTHEASTERN ILLINOIS";
      const prioritizedJobs = data.sort((a, b) => {
        const orgA = a.organization?.toUpperCase().trim();
        const orgB = b.organization?.toUpperCase().trim();
        return (orgA === sponsor ? -1 : orgB === sponsor ? 1 : 0);
      });
  
      setRecommendedJobs(prioritizedJobs);
      setError(null);
    } catch (error) {
      console.log("NO RECOMMENDED JOBS")
      setError(error.message);
      setRecommendedJobs([]);
    }
  };
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (loading) return <div className='container mt-4 text-center'>Loading volunteer opportunities...</div>;
  if (error) return <div className='container mt-4 text-center'>Error loading volunteer opportunities: {error}</div>;

  return (
    <div className='container mt-4 mb-5'>
      <div className='text-center mb-4'>
      <h2 className='custom-posts-title'>
        Your Volunteer Opportunities{firstName ? `, ${firstName}` : ''}
      </h2>
        <input
          type='text'
          className='form-control mt-3'
          placeholder='Search by title, organization, skill, or description'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='row'>
        <div className='col-12 col-lg-8 mb-4'>
          {(recommendedJobs.length > 0 ? recommendedJobs : currentJobs).map((job) => (
            <div className={`card mb-3 custom-card ${job.organization === 'MEALS ON WHEELS NORTHEASTERN ILLINOIS' ? 'highlight-meals promoted-card' : ''}`} key={job.id}>
              <div className='card-header d-flex justify-content-between align-items-center'>
                {job.title}
                {job.organization === 'MEALS ON WHEELS NORTHEASTERN ILLINOIS' && (
                  <span className='badge bg-info text-dark'>Promoted</span>
                )}
              </div>
              <div className='card-body'>
                <div className='d-flex justify-content-between flex-wrap'>
                  <h5 className='card-title' style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => toggleExpand(job.id)}>{job.organization}</h5>
                  <h6>{job.location}</h6>
                </div>
                <p className='card-text'>{job.description}</p>
                {expandedJobId === job.id && (
                  <>
                    <p><b>Eligibility:</b> {job.requirement}</p>
                    <p><b>Skills:</b> {job.skills}</p>
                  </>
                )}
                <div className='d-flex align-items-center mt-3'>
                  <button className='btn custom-btn-post-color me-3' style={{ backgroundColor: isJobApplied(job.id) ? '#B1DABE' : '', color: isJobApplied(job.id) ? 'black' : '' }} onClick={() => handleApply(job.id)} disabled={isJobApplied(job.id)}>{isJobApplied(job.id) ? 'Applied!' : 'Apply'}</button>
                  <i
                    className={`bi fs-3 thumb-icon ${isJobLiked(job.id) ? 'bi-hand-thumbs-up-fill liked' : 'bi-hand-thumbs-up'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleLike(job.id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='col-12 col-lg-4 mb-4'>
          <div className='p-4 bg-light rounded shadow-sm'>
            <h5>Customize Recommendations</h5>
            <p>Use this space to describe what you're looking for—we’ll generate relevant roles for you!</p>
            <form onSubmit={generateJobs}>
              <div className='mb-3'>
                <label htmlFor='newinterest' className='form-label'>Your Interests</label>
                <textarea className='form-control' id='newinterest' rows='3' value={newinterest} onChange={(e) => setNewInterest(e.target.value)}></textarea>
              </div>
              <button type='submit' className='btn custom-btn-post-color w-100'>Generate</button>
            </form>
          </div>
        </div>

        {totalPages > 1 && (
          <div className='col-12 d-flex justify-content-center gap-3 mt-4 mb-5'>
            <button
              className='btn custom-btn-post-color'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className='btn custom-btn-post-color'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;