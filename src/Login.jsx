import React,{useState} from 'react'
import {Link,Navigate} from 'react-router-dom'
import axios from 'axios'
const Login=()=>{
    const [Auth,setAuth]=useState(false)
    const [data,setData]=useState({
        email:'',
        password:'',
    })
    const changehandlers=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submithandler=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8008/login',data).then(
          res=>{localStorage.setItem('token',res.data.token);setAuth(true)}
        )
    }
    if(Auth){
        return <Navigate to='/dashboard'/>
    }
    return(
        <>
        <nav className="navbar navbar-light bg-light">
        <h1>
          <Link to='/' className="nav-link"><i className="fas fa-code">Developers Hub</i></Link>
        </h1>
        <ul className="navbar-nav ms-auto mb-lg-0">
          <li className="nav-item"><Link to='/register' className="nav-link active">Register</Link></li>
          <li className="nav-item"><Link to='/login' className="nav-link active">Login</Link></li>
        </ul>
        </nav>
         <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user">Sign Into Your Account</i></p>
            <form onSubmit={submithandler} className="form" autoComplete="off">
                <div className="form-group">
                    <input type="email" onChange={changehandlers} placeholder="Email Address" name="email" required />
                </div>
                <div className="form-group">
                    <input type="password" onChange={changehandlers} placeholder="Password" name="password" />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-l">
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
         </section>
        </>
    )
}
export default Login