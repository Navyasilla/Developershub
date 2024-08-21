import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import Myprofile from './Myprofile'
import Indprofile from './Indprofile'
const App=()=>{
return(
  <div>
<BrowserRouter>
<Routes>
  <Route path='/' exact Component={Home}/>
  <Route path='/login' exact Component={Login}/>
  <Route path='/register' exact Component={Register}/>
  <Route path='/dashboard'  exact Component={Dashboard} />
  <Route path='/myprofile' exact Component={Myprofile}/>
  <Route path='/indprofile/:fullname/:email/:skill/:id' exact Component={Indprofile}/>
  </Routes>
</BrowserRouter>

    </div>
)
}
export default App