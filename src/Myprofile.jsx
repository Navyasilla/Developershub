import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8008/myprofile', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    })
      .then(res => setData(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8008/myreview', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    })
      .then(res => setReview(res.data))
      .catch(err => console.error(err));

    // Fetch all profiles
    axios.get('http://localhost:8008/allprofiles', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    })
      .then(res => setAllProfiles(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light">
          <h1>
            <Link to='/' className="nav-link"><i className="fas fa-code">Developers Hub</i></Link>
          </h1>
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item"><Link to='/myprofile' className="nav-link active">My Profile</Link></li>
            <li className="nav-item"><Link to='/login' className="nav-link active">Logout</Link></li>
          </ul>
        </nav>
        {data && (
          <section className="container">
            <Link to='/dashboard' className='btn btn-light'>Back to profiles</Link>
            <div className="profile-grid my-l">
              <div className="profile-top bg-primary p-2">
                <img src="prof.jpg" alt="" className="round-img my-l" />
                <h1 className="large">{data.fullname}</h1>
                <p className="lead">{data.email}</p>
                <p>India</p>
              </div>
              <div className="profile-github">
                <h2 className="text-primary my-l">
                  <i className="fab fa-github"></i> Reviews and Ratings
                </h2>
                <div className="repo bg-white p-l my-l">
                  {review.length > 0 ? review.map((review, index) => (
                    <div key={index}>
                      <h4><Link to='#'>{review.taskprovider}</Link></h4>
                      <p>{review.rating}/5</p>
                    </div>
                  )) : (
                    <p>No review added yet</p>
                  )}
                </div>
                <div className="repo bg-white p-l my-l">
                  <div>
                    <h4>Enter Your Reviews</h4>
                    <form autoComplete="off" className="form">
                      <div className="form-group">
                        <input type="text" placeholder="Enter your rating out of 5" name="rating" required />
                      </div>
                      <input type="submit" className="btn btn-primary" value="Add Rating" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="container">
          <h2 className="text-primary">All Developer Profiles</h2>
          <div className="profile-grid my-l">
            {allProfiles.length > 0 ? allProfiles.map(profile => (
              <div key={profile._id} className="profile bg-light">
                <img src="prof.jpg" alt="" className="round-img my-l" />
                <div>
                  <h2>{profile.fullname}</h2>
                  <p>{profile.skill}</p>
                  <p>{profile.email}</p>
                  <Link to={`/profile/${profile._id}`} className="btn btn-primary">View Profile</Link>
                </div>
              </div>
            )) : (
              <p>No profiles found</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Myprofile;
