import React, {useState } from 'react';


function Posts() {
  
  
  
//   const [expandedPost, setExpandedPost] = useState(null);

//   // Hardcoded posts array with the desired format
//   const posts = [
//   {
//     id: 1,
//     role: 'Animal Shelter Volunteer',
//     event: 'Pet Adoption Day',
//     organization: 'Happy Tails Shelter',
//     description: 'Help care for and find loving homes for our furry friends.',
//   },
//   {
//     id: 2,
//     role: 'Kids Camp Mentor',
//     event: 'Summer Kids Camp',
//     organization: 'Youth Empowerment Center',
//     description: 'Guide children through fun, educational activities during camp.',
//   },
//   {
//     id: 3,
//     role: 'Healthcare Assistant',
//     event: 'Community Health Fair',
//     organization: 'HealthFirst',
//     description: 'Support healthcare professionals in providing community services.',
//   },
//   {
//     id: 4,
//     role: 'Tech Tutor',
//     event: 'Digital Literacy Workshop',
//     organization: 'Tech4All',
//     description: 'Teach basic computer skills to bridge the digital divide.',
//   },
//   {
//     id: 5,
//     role: 'Environmental Volunteer',
//     event: 'Park Cleanup Day',
//     organization: 'Green Earth',
//     description: 'Join us in cleaning up local parks and green spaces.',
//   },
//   {
//     id: 6,
//     role: 'Community Organizer',
//     event: 'Neighborhood Beautification',
//     organization: 'Community Cares',
//     description: 'Coordinate projects that improve local neighborhoods.',
//   },
//   {
//     id: 7,
//     role: 'Food Bank Volunteer',
//     event: 'Food Drive & Distribution',
//     organization: 'Feeding Hands',
//     description: 'Help collect, pack, and distribute food to those in need.',
//   },
//   {
//     id: 8,
//     role: 'Arts & Culture Assistant',
//     event: 'Local Arts Festival',
//     organization: 'Creative City',
//     description: 'Support community art events and showcase local talent.',
//   },
//   {
//     id: 9,
//     role: 'Sports Mentor',
//     event: 'Youth Sports Day',
//     organization: 'Active Minds',
//     description: 'Coach and mentor young athletes in sports and teamwork.',
//   },
//   {
//     id: 10,
//     role: 'Library Assistant',
//     event: 'Book Donation Drive',
//     organization: 'Community Library',
//     description: 'Assist with organizing events that promote literacy and reading.',
//   },
// ];


  // // Toggle the expanded state for a post
  // const toggleExpand = (id) => {
  //   if (expandedPost === id) {
  //     setExpandedPost(null);
  //   } else {
  //     setExpandedPost(id);
  //   }
  // };

  return (
    // <div className="container mt-4">
    //   <h2 className='custom-posts-title'>Volunteer Opportunities</h2>
    //     {posts.map((post) => (
        //     <div key={post.id} className="card my-4 p-3 custom-card-bg-color custom-border">
        //         <div className="d-flex justify-content-center align-items-center">
        //             <div className='d-flex flex-column align-items-center'>
        //                 <h5 className='custom-job-role'>{post.role}</h5>
        //                 <p className="mb-1">
        //                     <a class="nav-link active" aria-current="page" href="#"> {post.event} </a>
        //                 </p>
        //                 <p className="mb-1">
        //                     <a class="nav-link active" aria-current="page" href="#"> {post.organization} </a>
        //                 </p>
        //             </div>
        //         <button className="btn btn-link" onClick={() => toggleExpand(post.id)}>
                   
        //         {expandedPost === post.id ? (
        //             <i className="bi bi-caret-up-fill custom-arrow"></i>//if expanded show up arrow
        //         ) : (
        //             <i className="bi bi-caret-down-fill custom-arrow"></i>//else show down arrow
        //         )}
        //         </button>
        //     </div>
        //         {expandedPost === post.id && (
        //         <div className='d-flex flex-column text-center'>
        //             <p className="mt-2 custom-description-color">{post.description}</p>
        //             <button className="btn btn-primary w-auto custom-btn-post-color">I am interested!</button>
        //         </div>
        //     )}
        // </div>
    //   ))}
    // </div>

    <div className='container mt-4'>
      <div className='row'>
          <div className='col-7'>
              <div className='pt-4 text-center'>
                <h2> Volunteer Opportunities</h2>
              </div>
              <div className='pt-4 d-flex flex-column align-items-center row-gap-4'>

                  <div className="card custom-card">
                      <div className="card-header">
                        Software Engineer
                      </div>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title">Evanston Bicycles Recyclery</h5>
                          <h6>Evanston, IL</h6>
                        </div>
                        <p className="card-text">Teach basic computer skills to bridge the digital divide </p>
                        <div className='d-flex'>
                          <div className='col-9'>
                            <a href="#" className="btn btn-primary">Apply</a>
                          </div>
                          <div className='col-3 d-flex justify-content-around'>
                            <i className="bi bi-hand-thumbs-up xl"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>



<div className="card custom-card">
                      <div className="card-header">
                        Software Engineer
                      </div>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title">Evanston Bicycles Recyclery</h5>
                          <h6>Evanston, IL</h6>
                        </div>
                        <p className="card-text">Teach basic computer skills to bridge the digital divide </p>
                        <div className='d-flex'>
                          <div className='col-9'>
                            <a href="#" className="btn btn-primary">Apply</a>
                          </div>
                          <div className='col-3 d-flex justify-content-around'>
                            <i className="bi bi-hand-thumbs-up xl"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>




<div className="card custom-card">
                      <div className="card-header">
                        Software Engineer
                      </div>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title">Evanston Bicycles Recyclery</h5>
                          <h6>Evanston, IL</h6>
                        </div>
                        <p className="card-text">Teach basic computer skills to bridge the digital divide </p>
                        <div className='d-flex'>
                          <div className='col-9'>
                            <a href="#" className="btn btn-primary">Apply</a>
                          </div>
                          <div className='col-3 d-flex justify-content-around'>
                            <i className="bi bi-hand-thumbs-up xl"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>


<div className="card custom-card">
                      <div className="card-header">
                        Software Engineer
                      </div>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title">Evanston Bicycles Recyclery</h5>
                          <h6>Evanston, IL</h6>
                        </div>
                        <p className="card-text">Teach basic computer skills to bridge the digital divide </p>
                        <div className='d-flex'>
                          <div className='col-9'>
                            <a href="#" className="btn btn-primary">Apply</a>
                          </div>
                          <div className='col-3 d-flex justify-content-around'>
                            <i className="bi bi-hand-thumbs-up xl"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>

<div className="card custom-card">
                      <div className="card-header">
                        Software Engineer
                      </div>
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title">Evanston Bicycles Recyclery</h5>
                          <h6>Evanston, IL</h6>
                        </div>
                        <p className="card-text">Teach basic computer skills to bridge the digital divide </p>
                        <div className='d-flex'>
                          <div className='col-9'>
                            <a href="#" className="btn btn-primary">Apply</a>
                          </div>
                          <div className='col-3 d-flex justify-content-around'>
                            <i className="bi bi-hand-thumbs-up xl"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>




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



