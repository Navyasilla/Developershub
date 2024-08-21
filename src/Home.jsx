import React from 'react'
import {Link} from 'react-router-dom'
const Home=()=>{
    return(
        <>
        <nav className="navbar navbar-light bg-light navbar-expand-md">
        <h1>
          <Link to='/' className="nav-link"><i className="fas fa-code">Developers Hub</i></Link>
        </h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
          <li className="nav-item"><Link to='/register' className="nav-link active">Register</Link></li>
          <li className="nav-item"><Link to='/login' className="nav-link">Login</Link></li>
        </ul>
        </div>
        </nav>
       <section className="landing mb-100">
          <div className="dark-overlay">
            <div className="landing-inner">
              <h1 className="x-large">Developers Hub</h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help from other developers
              </p>
              <div className="buttons">
                <Link to='/register' className='btn btn-primary'>Sign Up</Link>
                <Link to='/login' className='btn btn-light'>Login</Link>
              </div>
            </div>
          </div>

       </section>
        
        </>
    )
}
export default Home