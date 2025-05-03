import React, {useEffect, useState } from 'react';


function Posts() {
  const sampleJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Evanston Bicycles Recyclery",
    location: "Evanston, IL",
    description:
      "Teach basic computer skills to bridge the digital divide and keep donated hardware alive.",
    eligibility: "Must be 18+ with a passion for community tech literacy.",
    skills: "JavaScript · React · Linux basics",
  },
  {
    id: 2,
    title: "Marketing Coordinator",
    company: "Green Gardens Co‑op",
    location: "Chicago, IL",
    description: "Help us craft social posts that highlight sustainable urban farming.",
    eligibility: "Open to high‑school graduates and above.",
    skills: "Copy‑writing · Canva · Instagram/Threads",
  },
  {
    id: 3,
    title: "Community Tutor",
    company: "Northside Literacy Center",
    location: "Skokie, IL",
    description: "Tutor adults preparing for the GED—training provided.",
    eligibility: "Must pass a background check and complete orientation.",
    skills: "Patience · Communication · Basic algebra",
  },
];

  const [expandedJobId, setExpandedJobId] = useState(null); // init all cards as non-expanded
  const toggleExpand = (id) => {
    setExpandedJobId(prevId => (prevId === id ? null : id));
  }
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);//loading state
  const [error, setError] = useState(null);//any error
  const [currentPage, setCurrentPage] = useState(1);//for pagination
  const itemsPerPage = 6;//first index

 

  const backendApiUrl = 'http://localhost:5001';
  

  useEffect(()  => {

      setLoading(true);
      setError(null);
      const fetchAllJobs = async () => {
          try
          {
            const res = await fetch (`${backendApiUrl}/posts/`)

            if (!res.ok){
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setAllJobs(data); 
          }
          catch(error)
          {
            setError(error.message);//set error to be that message
            setAllJobs([]);
          }
          finally{
            setLoading(false);
          }
        };

        fetchAllJobs();
      },
      []);

  const startIndex = (currentPage - 1) * itemsPerPage;//first index
  const endIndex = startIndex + itemsPerPage;// lastindex
  const currentJobs = allJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allJobs.length / itemsPerPage);//number of pages

  //moving to the next page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div className='container mt-4 text-center'>Loading volunteer opportunities...</div>;
  }

  if (error) {
    return <div className='container mt-4 text-center'>Error loading volunteer opportunities: {error}</div>;
  }

  return (

    <div className='container mt-4'>
      <div className='row'>
          <div className='col-7'>
              <div className='pt-4 text-center'>
                <h2> Volunteer Opportunities</h2>
              </div>
              <div className='d-flex'>
                <button className={`btn btn-primary me-auto ${currentPage === 1 ? 'disabled': ''}`} onClick={() => handlePageChange(currentPage - 1)}> Previous</button>
                <button className={`btn btn-primary  ${currentPage === totalPages ? 'disabled': ''}`} onClick={() => handlePageChange(currentPage + 1)}> Next</button>
              </div>
              <div className='pt-4 d-flex flex-column align-items-center row-gap-4'>

                {currentJobs.map((job)  => (     
                    <div className="card custom-card">
                      <div className="card-header"  >
                        {job.title}
                      </div>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => toggleExpand(job.id)} >{job.organization}</h5>
                          <h6>{job.location}</h6>
                        </div>
                        <p className="card-text">{job.description} </p>
                        {expandedJobId === job.id && (
                          <>
                          <p className="card-text mt-2"><b>Eligibility:</b> {job.requirement}</p>
                          <p className="card-text"><b>Skills:</b> {job.skills}</p>
                          </>
                        )} 
                        <div className='d-flex'>
                          <div className='col-9'>
                            <a href={job.url} className="btn btn-primary" target="_blank"  rel="noopener noreferrer">Apply</a>
                          </div>
                          <div className='col-3 d-flex justify-content-around'>
                            <i className="bi bi-hand-thumbs-up xl"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>))} 
              </div>
            </div>
              
          

          <div className='col vh-100'>
            <div className='row text-center h-40'> 
              {/* <i className="bi bi-person-circle"  style='font-size: 50em;'></i> */}
              <div className="icon-container" style={{width: "100%", height:"100%"}}>
                <i className="bi bi-person-circle" style={{fontSize: "10em"}}></i>
              </div>
            </div>

            <div className='row'>
                <button className='btn btn-secondary'>Customize your Posts!</button>
            </div>

            <div className='row'>
                  {/*  */}

                  <form className='pt-4'>
                        <div>
                            <h5 className='custom-landing-text mb-0'></h5>
                            <p className='ps-3'>Use this space to search for any specific interests you may have and our model will recommend them for you!</p>
                        </div>

                        <div className='container pt-1 custom-form-section'>
                            <div class="row g-3 pb-3">
                                <div class="col">
                                    <label for="title" className="form-label">Title</label>
                                        <input className="form-control" placeholder='What role would you like to do?' id="title" />
                                </div>
                            </div>


                            <div class='row g-3 pb-3'>
                                <div class="col">
                                    <label for="org" class="form-label">Organization</label>
                                        <input class="form-control" placeholder='Any organization in mind?' id="org"/>
                                </div>

                            </div>
                            
                            <div className='row g-3 pb-3'>
                                <div class="col-md-7">
                                    <label for="city" class="form-label">City</label>
                                        <input type="text"  placeholder='Location preferences?' class="form-control" id="city" />
                                </div>

                                <div class="col-md-5">
                                    <label for="inputState" class="form-label">State</label>
                                        <select id="inputState" class="form-select" >
                                            <option selected>Choose...</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h5 className='custom-landing-text pt-5'>Skills and Interests</h5>
                                <p className='ps-3 mt-2'>Our application uses the information you enter here to match you to relevant volunteer opportunities around your area. Don't be shy to include any skills you may have as well as areas you are interested in volunteering.</p>
                        </div>

                        <div className='container pt-1 custom-form-section'>
                            <div className='row g-3 pb-3'>
                                <div class="col">
                                    <label for="interests" class="form-label"></label> 
                                        <textarea class="form-control" id="interests" rows="3"></textarea>
                                </div>
                            </div>

                            <div class="col-12">
                                    <button type="submit" className="btn btn-primary" >Generate</button>
                            </div>

                        </div>

              
                    </form>

                  {/*  */}
            </div>

          </div>
      </div>
    </div>


  );
};

export default Posts;



