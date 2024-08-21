import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Indprofile = () => {
    const { fullname, email, skill, id } = useParams();
    const [rating, setRating] = useState('');
    const [taskprovider, setTaskprovider] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the task provider's name when the component mounts
        axios.get('http://localhost:8008/myprofile', {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        }).then(res => setTaskprovider(res.data.fullname))
          .catch(err => console.error(err));
    }, []);

    const submithandler = async (e) => {
        e.preventDefault();  // Prevent form from submitting prematurely
        if (loading) return;  // Prevent multiple submissions

        setLoading(true);  // Set loading state

        let review = {
            taskprovider,
            taskworker: id,
            rating
        };

        try {
            const res = await axios.post('http://localhost:8008/addreview', review, {
                headers: {
                    'x-token': localStorage.getItem('token')
                }
            });
            console.log(res.data)
            alert(res.data);
        } catch (err) {
            console.error(err);
            alert('Error submitting review');
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    return (
        <>
            <div>
                <nav className="navbar navbar-light bg-light">
                    <h1>
                        <Link to='/' className="nav-link"><i className="fas fa-code">Developers Hub</i></Link>
                    </h1>
                    <ul className="navbar-nav ms-auto mb-lg-0">
                        <li className="nav-item"><Link to='/myprofile' className="nav-link active">My Profile</Link></li>
                        <li className="nav-item"><Link to='/login' onClick={() => localStorage.removeItem('token')} className="nav-link active">Logout</Link></li>
                    </ul>
                </nav>
                <section className="container">
                    <Link to='/dashboard' className='btn btn-light'>Back to profiles</Link>
                    <div className="profile-grid my-l">
                        <div className="profile-top  p-2">
                            <img src="prof.jpg" alt="" className="round-img my-l" />
                            <h1 className="large">{fullname}</h1>
                            <p className="lead">{email}</p>
                            <p>India</p>
                        </div>
                        <div className="profile-github">
                            <h2 className="text-primary my-l">
                                <i className="fab fa-github"></i> Reviews and Ratings
                            </h2>
                            <div className="repo bg-white p-l my-l">
                                <div>
                                    <h4>Enter Your Reviews</h4>
                                    <form autoComplete="off" className="form" onSubmit={submithandler}>
                                    <div className="form-group">
                                    <input type="text" onChange={e => setRating(e.target.value)} value={rating} placeholder="Enter your rating out of 5" name="rating" required />
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Add Rating" disabled={loading} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Indprofile;
