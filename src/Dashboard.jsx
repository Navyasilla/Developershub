import React,{useState,useEffect} from 'react'
import {Link,Navigate} from 'react-router-dom'
import axios from 'axios'
const Dashboard=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8008/allprofiles',{
            headers:{
                'x-token':localStorage.getItem('token')
            }
        }).then(res=>setData(res.data))
    },[])
    if(!localStorage.getItem('token')){
        return <Navigate to='/login'/>
    }
 
   return(
   
    <>
    <nav className="navbar navbar-light bg-light">
        <h1>
          <Link to='/' className="nav-link"><i className="fas fa-code">Developers Hub</i></Link>
        </h1>
        <ul className="navbar-nav ms-auto mb-lg-0">
          <li className="nav-item"><Link to='/myprofile' className="nav-link active">My Profile</Link></li>
          <li className="nav-item"><Link to='/login' onClick={()=>localStorage.removeItem('token')} className="nav-link active">Logout</Link></li>
        </ul>
        </nav>
        <section className="container">
        <h1 className="large text-primary">Developers</h1>
            <p className="lead"><i className="fab fa-connectdevelop"></i>Browse and connect with developers</p>
            <div className="profiles">
                {data.length>=1 ? 
                data.map(profile=>
                    <div className="profile bg-light">
                    <img src="prof.jpg" alt="" />
                
                <div>
                <h2>{profile.fullname}</h2>
                <p>{profile.email}</p>
                <p>India</p>
                <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className='btn btn-primary'>View profile</Link>
                </div>
                <ul>
                    {profile.skill.split(',').map(skill=> <li className="text-primary">
                        <i className="fas fa-check"></i>{skill}
                    </li>)}
                   
                   
                </ul>
            </div>
                )
                :null}
                
            
            </div>
        </section>
    </>
   )
}
export default Dashboard