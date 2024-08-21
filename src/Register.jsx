import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    skill: '',
    password: '',
    confirmpassword: '',
  });

  const [submit, setSubmit] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    if (submit) {
      const registerUser = async () => {
        try {
          const res = await fetch('http://localhost:8008/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const result = await res.json();
          setResponse(result);

          if (res.status === 200) {
            navigate('/login');
          } else {
            console.log(result.message);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      };

      registerUser();
      setSubmit(false);
    }
  }, [submit, data, navigate]);

  return (
    <>
      <nav className="navbar navbar-light bg-light navbar-expand-md">
        <h1>
          <Link to="/" className="nav-link">
            <i className="fas fa-code"> Developers Hub</i>
          </Link>
        </h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/register" className="nav-link active">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form onSubmit={submitHandler} className="form" autoComplete="off">
          <div className="form-group">
            <input type="text" onChange={changeHandler} placeholder="Name" name="fullname" required />
          </div>
          <div className="form-group">
            <input type="email" onChange={changeHandler} placeholder="Email address" name="email" required />
          </div>
          <div className="form-group">
            <input type="text" onChange={changeHandler} placeholder="Mobile" name="mobile" required />
          </div>
          <div className="form-group">
            <input type="text" onChange={changeHandler} placeholder="Skill" name="skill" required />
          </div>
          <div className="form-group">
            <input type="password" onChange={changeHandler} placeholder="Password" name="password" required />
          </div>
          <div className="form-group">
            <input type="password" onChange={changeHandler} placeholder="Confirm Password" name="confirmpassword" required />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </>
  );
};

export default Register;
